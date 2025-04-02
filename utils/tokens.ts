import { createAdminClient } from "@/appwrite/config";
import { auth } from "@clerk/nextjs/server";
import { Query } from "node-appwrite";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;

export async function addTokens(clerk_user_id: string, numTokens: number) {
	// ! This server action is possible to be called by the client, so we need to validate the user
	const { userId } = await auth();
	if (userId !== clerk_user_id) {
		throw new Error('Unauthorized');
	}
	const { databases } = await createAdminClient();
	const documentToUpdate = await databases.listDocuments(dbId, 'user_queries', [
		Query.select(['$id', 'document_quota_left']),
		Query.equal('clerk_user_id', clerk_user_id),
	]);
	if (documentToUpdate.documents.length === 0) {
		await databases.createDocument(dbId, 'user_queries', clerk_user_id, {
			clerk_user_id: clerk_user_id,
			document_quota_left: numTokens,
		});
	} else {
		const docId = documentToUpdate.documents[0].$id;
		const tokens = documentToUpdate.documents[0].document_quota_left + numTokens;
		await databases.updateDocument(dbId, 'user_queries', docId, {
			document_quota_left: tokens,
		});
	}
}
