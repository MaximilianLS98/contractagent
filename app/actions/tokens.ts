import { createAdminClient } from "@/appwrite/config";
import { Query, ID } from "node-appwrite";
import { START_TOKENS, TOKENS_PER_QUERY } from "@/config";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

export async function getTokens(clerk_user_id: string) {
    if (!clerk_user_id) {
        return 0;
    }
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(dbId, 'user_queries', [
        Query.select(['$id', 'document_quota_left']),
        Query.equal('clerk_user_id', clerk_user_id)
    ]);
    if (result.documents.length === 0) {
        return START_TOKENS;
    }
    return result.documents[0].document_quota_left;
}

export async function setUpTokensForFirstTimeUser(clerk_user_id: string) {
    const { databases } = await createAdminClient();
    await databases.createDocument(dbId, collectionId, clerk_user_id, {
        clerk_user_id: clerk_user_id,
        document_quota_left: START_TOKENS
    });
    revalidateTag('tokens');
}