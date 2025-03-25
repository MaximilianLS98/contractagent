import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='border-t bg-background'>
			<div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
				<div className='grid gap-8 lg:grid-cols-4'>
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<Shield className='h-6 w-6 text-primary' />
							<span className='text-xl font-semibold tracking-tight'>LegalEdge</span>
						</div>
						<p className='text-sm text-muted-foreground'>
							AI-drevet juridisk dokumentverifisering for moderne advokatfirmaer.
						</p>
						<div className='flex space-x-4'>
							<Link href='#' className='text-muted-foreground hover:text-foreground'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-5 w-5'>
									<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
									<rect width='4' height='12' x='2' y='9'></rect>
									<circle cx='4' cy='4' r='2'></circle>
								</svg>
								<span className='sr-only'>LinkedIn</span>
							</Link>
							<Link href='#' className='text-muted-foreground hover:text-foreground'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='h-5 w-5'>
									<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
								</svg>
								<span className='sr-only'>Twitter</span>
							</Link>
						</div>
					</div>
					<div className='space-y-4'>
						<h4 className='text-sm font-semibold'>Produkt</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='#features'
									className='text-muted-foreground hover:text-foreground'>
									Funksjoner
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Priser
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Casestudier
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Dokumentasjon
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-4'>
						<h4 className='text-sm font-semibold'>Selskap</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Om oss
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Blogg
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Karrierer
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Kontakt
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-4'>
						<h4 className='text-sm font-semibold'>Juridisk</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='/terms-of-service'
									className='text-muted-foreground hover:text-foreground'>
									Vilkår for tjenesten
								</Link>
							</li>
							<li>
								<Link
									href='/privacy-policy'
									className='text-muted-foreground hover:text-foreground'>
									Personvernregler
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Sikkerhet
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
									Samsvar
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-12 border-t pt-8 text-center text-sm text-muted-foreground'>
					<p>© 2025 LegalEdge. Alle rettigheter reservert.</p>
				</div>
			</div>
		</footer>
	);
}
