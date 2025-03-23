import { createAdminClient } from "@/appwrite/config";
import { Query, ID } from "node-appwrite";
import { START_TOKENS, TOKENS_PER_QUERY } from "@/config";
import { revalidateTag } from "next/cache";

const dbId = process.env.APPWRITE_DB_ID as string;

export async function addTokens(clerk_user_id: string, numTokens: number) {
    const { databases } = await createAdminClient();
    const documentToUpdate = await databases.listDocuments(dbId, 'user_queries', [
        Query.select(['$id', 'document_quota_left']),
        Query.equal('clerk_user_id', clerk_user_id)
    ]);
    if (documentToUpdate.documents.length === 0) {
        await databases.createDocument(dbId, 'user_queries', clerk_user_id, {
            clerk_user_id: clerk_user_id,
            document_quota_left: numTokens
        });
    } else {
        const docId = documentToUpdate.documents[0].$id;
        const tokens = documentToUpdate.documents[0].document_quota_left + numTokens;
        await databases.updateDocument(dbId, 'user_queries', docId, {
            document_quota_left: tokens
        });
    }

}

export async function setUpTokensForFirstTimeUser(clerk_user_id: string) {
    const { databases } = await createAdminClient();
    await databases.createDocument(dbId, 'user_queries', clerk_user_id, {
        clerk_user_id: clerk_user_id,
        document_quota_left: START_TOKENS
    });
    revalidateTag('tokens');
}