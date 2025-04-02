import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from "@/components/Header"
import Footer from '@/components/Footer';
import { DemoBanner } from '@/components/Demo-banner';
import { ClerkProvider } from '@clerk/nextjs';
import { PostHogProvider } from '@/components/PostHogProvider';
import { Toaster } from 'sonner';
import { TokenProvider } from '@/context/TokenContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'LegalEdge AI - AI-drevet juridisk dokumentverifisering',
	description:
		'Spar timer med manuell gjennomgang. La AI identifisere juridiske risikoer og flagge potensielle problemer i kontrakter øyeblikkelig.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<PostHogProvider>
						<TokenProvider>
							<Header />
							<DemoBanner />
							{children}
							<Footer />
							<Toaster richColors />
						</TokenProvider>
					</PostHogProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
