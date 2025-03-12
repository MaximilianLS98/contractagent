import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import { DemoBanner } from "@/components/Demo-banner"
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: 'LegalEdge AI - AI-drevet juridisk dokumentverifisering',
	description:
		'Spar timer med manuell gjennomgang. La AI identifisere juridiske risikoer og flagge potensielle problemer i kontrakter øyeblikkelig.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Header />
					<DemoBanner />
					{children}
				</body>
			</html>
		</ClerkProvider>
  );
}

