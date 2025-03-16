'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from '@clerk/nextjs';

const navItems = [
	{ href: '/', label: 'Hjem' },
	{ href: '/#features', label: 'Funksjoner' },
	{ href: '/#how-it-works', label: 'Hvordan det fungerer' },
	{ href: '/#why-choose', label: 'Hvorfor velge oss' },
	{ href: '/#faq', label: 'FAQ' },
	{ href: '/upload', label: 'Demo' },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-16 items-center justify-between'>
				<Link href='/'>
					<div className='flex items-center gap-1'>
						<Shield className='h-6 w-6 text-accent' />
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
					<SignedOut>
						<SignInButton />
						<SignUpButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
					<Button className='hidden md:flex'>Kom i gang</Button>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='md:hidden'>
								<Menu className='h-6 w-6' />
								<span className='sr-only'>Åpne meny</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right'>
							<nav className='flex flex-col gap-4'>
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`text-sm font-medium transition-colors hover:text-foreground ${
											pathname === item.href
												? 'text-foreground'
												: 'text-muted-foreground'
										}`}
										onClick={() => setIsOpen(false)}>
										{item.label}
									</Link>
								))}
								{/* <Button variant='outline' className='w-full'>
									Logg inn
								</Button> */}
								<SignInButton />
								<Button className='w-full'>Kom i gang</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
