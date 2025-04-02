'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from '@clerk/nextjs';

const navItems = [
	{ href: '/', label: 'Hjem' },
	{ href: '/livedemo', label: 'Analyser' },
	{ href: '/upload', label: 'Demo' },
	{ href: '/contact', label: 'Kontakt' },
];

type Props = {
	userTokens?: number;
};

export default function HeaderClient(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

    return (
		<div className='container flex h-16 items-center justify-between'>
			<Link href='/'>
				<div className='flex items-center gap-1'>
					<Shield className='h-6 w-6 text-primary' />
					<span className='text-xl font-semibold tracking-tight'>
						Legal<span className='text-primary'>Edge</span>
					</span>
				</div>
			</Link>
			<nav className='hidden md:flex gap-6 text-md'>
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`font-medium transition-colors hover:text-foreground ${
							pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
						}`}>
						{item.label}
					</Link>
				))}
			</nav>
			<div className='flex items-center gap-4'>
				{/* <Button variant='outline' className='hidden md:flex'>
						Logg inn
					</Button> */}
				<div className='hidden md:flex gap-4'>
					<SignedOut>
						<SignInButton>Logg inn</SignInButton>
						<SignUpButton>Registrer</SignUpButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
				<p>{props.userTokens} Analyser</p>
				<Link href='/buytokens'>
					<Button className='hidden md:flex'>Kjøp flere Analyser</Button>
				</Link>
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='md:hidden'>
							<Menu className='h-6 w-6' />
							<span className='sr-only'>Åpne meny</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='right' className='p-2'>
						<SheetTitle className='text-5xl'>LegalEdge</SheetTitle>
						<nav className='flex flex-col gap-4'>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`text-lg font-medium transition-colors hover:text-foreground border-b-2 ${
										pathname === item.href
											? 'text-foreground'
											: 'text-muted-foreground'
									}`}
									onClick={() => setIsOpen(false)}>
									{item.label}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-4 inline ml-2'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M9 5l7 7-7 7'
										/>
									</svg>
								</Link>
							))}
							<SignedOut>
								<SignInButton>Logg inn</SignInButton>
								<SignUpButton>Registrer</SignUpButton>
							</SignedOut>
							<SignedIn>
								<div className='absolute bottom-4 right-4'>
									<UserButton />
								</div>
							</SignedIn>
							<Link href='/buytokens' className='mt-6'>
								<Button className='w-full'>Kjøp Tokens</Button>
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}