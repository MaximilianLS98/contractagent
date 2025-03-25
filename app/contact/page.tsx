import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='text-center mb-12'>
				<h1 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
					Kontakt oss
				</h1>
				<p className='mt-4 text-muted-foreground max-w-2xl mx-auto'>
					Har du spørsmål om plattformen eller annet relevant? Vi skal svare så godt det
					lar seg gjøre.
				</p>
			</div>

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12'>
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<Mail className='mr-2 h-5 w-5 text-primary' />
							Email
						</CardTitle>
					</CardHeader>
					<CardContent className=''>
						<h3>Support</h3>
						<Link
							href='mailto:maximilian+legaledgesupport@kaktusfamilien.no'
							className='text-muted-foreground hover:text-primary'>
							maximilian@kaktusfamilien.no
						</Link>
						<br />
						<h3>Salg</h3>
						<Link
							href='mailto:maximilian+legaledgesalg@kaktusfamilien.no'
							className='text-muted-foreground hover:text-primary'>
							maximilian@kaktusfamilien.no
						</Link>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<Phone className='mr-2 h-5 w-5 text-primary' />
							Telefon
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground line-through'>+47 981 55 549</p>
						<p className='text-muted-foreground'>Mandag - Fredag, 09:00 - 17:00</p>
					</CardContent>
				</Card>

				{/* <Card>
					<CardHeader className='pb-2'>
						<CardTitle className='flex items-center'>
							<MapPin className='mr-2 h-5 w-5 text-primary' />
							Address
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground'>123 Legal Tech Plaza</p>
						<p className='text-muted-foreground'>Suite 400</p>
						<p className='text-muted-foreground'>New York, NY 10001</p>
					</CardContent>
				</Card> */}
			</div>

			<div className='grid gap-8 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Send us a message</CardTitle>
						<CardDescription>
							Fill out the form below and we'll get back to you as soon as possible.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className='space-y-4'>
							<div className='grid gap-4 md:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='first-name'>First name</Label>
									<Input id='first-name' placeholder='John' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='last-name'>Last name</Label>
									<Input id='last-name' placeholder='Doe' />
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input id='email' type='email' placeholder='john.doe@example.com' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone (optional)</Label>
								<Input id='phone' type='tel' placeholder='+1 (555) 123-4567' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='inquiry-type'>Inquiry type</Label>
								<Select>
									<SelectTrigger id='inquiry-type'>
										<SelectValue placeholder='Select an inquiry type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='general'>General Inquiry</SelectItem>
										<SelectItem value='sales'>Sales</SelectItem>
										<SelectItem value='support'>Technical Support</SelectItem>
										<SelectItem value='billing'>Billing</SelectItem>
										<SelectItem value='partnership'>Partnership</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='message'>Message</Label>
								<Textarea
									id='message'
									placeholder='How can we help you?'
									className='min-h-[120px]'
								/>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<Button className='w-full'>Send Message</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Tilgjengelighet</CardTitle>
						<CardDescription>
							Vi er tilgjengelig til å svare på telefon eller epost i følgende
							tidsrom:
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-start space-x-3'>
							<Clock className='h-5 w-5 text-primary mt-0.5' />
							<div>
								<p className='font-medium'>Mandag - Fredag</p>
								<p className='text-muted-foreground'>9:00 - 17:00</p>
							</div>
						</div>
						<div className='flex items-start space-x-3'>
							<Clock className='h-5 w-5 text-primary mt-0.5' />
							<div>
								<p className='font-medium'>Lørdag / Søndag</p>
								<p className='text-muted-foreground'>10:00 AM - 2:00 PM EST</p>
							</div>
						</div>
						<div className='pt-4 border-t'>
							<p className='text-sm text-muted-foreground'>
								For tidssensitive forhold utenfor arbeidstid, send epost til
								maximilian@kaktusfamilien.no med "HAST" i emnefeltet, så skal vi
								svare så fort vi klarer.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
