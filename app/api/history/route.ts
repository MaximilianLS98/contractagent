// ! Since we dont have row level security in appwrite, we need to fetch the history for the current user
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/appwrite/config';
import { Query } from 'node-appwrite';
import { auth } from '@clerk/nextjs/server';
const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_HISTORY as string;

export async function GET() {
	const { userId } = await auth();
	console.log('user', userId);
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const { databases } = await createAdminClient();
	const history = await databases.listDocuments(dbId, collectionId, [
		Query.equal('user_id', [userId]),
		Query.orderDesc('$createdAt'),
	]);
	return NextResponse.json(history);
}
