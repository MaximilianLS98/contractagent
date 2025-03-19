import { createAdminClient } from "@/appwrite/config";
import { Query, ID } from "node-appwrite";
import { START_TOKENS, TOKENS_PER_QUERY } from "@/config";

export async function addTokens(clerk_user_id: string, numTokens: number) {
    const { databases } = await createAdminClient();
    const documentToUpdate = await databases.listDocuments('legaledge', 'user_queries', [
        Query.select(['$id', 'document_quota_left']),
        Query.equal('clerk_user_id', clerk_user_id)
    ]);
    if (documentToUpdate.documents.length === 0) {
        await databases.createDocument('legaledge', 'user_queries', clerk_user_id, {
            clerk_user_id: clerk_user_id,
            tokens: numTokens
        });
    } else {
        const docId = documentToUpdate.documents[0].$id;
        const tokens = documentToUpdate.documents[0].document_quota_left + numTokens;
        await databases.updateDocument('legaledge', 'user_queries', docId, {
            tokens: tokens
        });
    }

}

export async function setUpTokensForFirstTimeUser(clerk_user_id: string) {
    const { databases } = await createAdminClient();
    await databases.createDocument('legaledge', 'user_queries', clerk_user_id, {
        clerk_user_id: clerk_user_id,
        tokens: START_TOKENS
    });
}