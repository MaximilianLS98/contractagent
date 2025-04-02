'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Client } from 'appwrite';

type TokenContextType = {
	tokenCount: number | null;
	refresh: () => Promise<void>;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
    console.log(`TokenProvider`);
	const { user, isLoaded, isSignedIn } = useUser();
	const [tokenCount, setTokenCount] = useState<number | null>(null);

	const fetchTokenCount = async () => {
		const res = await fetch('/api/tokens');
		const data = await res.json();
		setTokenCount(data.tokens);
	};

	useEffect(() => {
		if (!isLoaded || !isSignedIn) {
            console.log(`Isloaded:`, isLoaded, `IsSignedIn:`, isSignedIn);
            return;
        };

		fetchTokenCount();

		// Realtime setup
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

		// const realtime = new Realtime(client);
        const eventString = `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID}.documents`;
        console.log(`Subscribing to eventString:`, eventString);
		const unsubscribe = client.subscribe(
			eventString,
			response => {
                console.log(`response from subscribe:`, response);
				const doc = response.payload as { clerk_user_id: string; document_quota_left: number };
				if (doc.clerk_user_id === user.id) {
					if (doc.clerk_user_id === user.id) {
						setTokenCount(doc.document_quota_left);
					}
				}
			},
		);

		return () => {
            unsubscribe();   
		};
	}, [isLoaded, user]);

	return (
		<TokenContext.Provider value={{ tokenCount, refresh: fetchTokenCount }}>
			{children}
		</TokenContext.Provider>
	);
};

export const useTokenCount = () => {
	const ctx = useContext(TokenContext);
	if (!ctx) throw new Error('useTokenCount must be used within TokenProvider');
	return ctx;
};
