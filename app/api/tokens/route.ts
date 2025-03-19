import { NextResponse, NextRequest } from 'next/server';
import { createAdminClient } from '@/appwrite/config';
import { auth } from '@clerk/nextjs/server';
import { setUpTokensForFirstTimeUser } from '@/app/actions/tokens';
import { START_TOKENS } from '@/config';

// This is for fetching the users document_quota_left from the appwrite database. It needs to validate the user first.
export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
		}

		const { databases } = await createAdminClient();
		const result = await databases.getDocument('legaledge', 'user_queries', userId);
		// if no document is found, the user is new and we need to set up the tokens for them (this should never happen, as the new user tokens should be set up by clerk webhooks)
		if (!result.$id) {
            console.log(`User ${userId} is new, setting up tokens for first time user`);
			setUpTokensForFirstTimeUser(userId);
			return NextResponse.json({ tokens: START_TOKENS });
		}
		return NextResponse.json({ tokens: result.document_quota_left });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
