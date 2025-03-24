import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import { DemoBanner } from "@/components/Demo-banner"
import { ClerkProvider } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server"
import { createAdminClient } from "@/appwrite/config"
import { auth } from "@clerk/nextjs/server"
import { PostHogProvider } from "@/components/PostHogProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: 'LegalEdge AI - AI-drevet juridisk dokumentverifisering',
	description:
		'Spar timer med manuell gjennomgang. La AI identifisere juridiske risikoer og flagge potensielle problemer i kontrakter øyeblikkelig.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { getToken } = await auth();
  const token = await getToken();

  const fetchUrl = process.env.ENVIRONMENT === 'production' ? 'https://legaledge.kaktusfamilien.com/api/tokens' : 'http://localhost:3000/api/tokens';

  const response = await fetch(fetchUrl, { 
    method: 'GET', 
    next: { tags: ['tokens'] }, 
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();

  return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
          <PostHogProvider>
					<Header userTokens={data.tokens} />
					<DemoBanner />
					{children}
          </PostHogProvider>
				</body>
			</html>
		</ClerkProvider>
  );
}
