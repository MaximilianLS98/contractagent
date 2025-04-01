'use client';
import { useActionState, useState } from 'react';
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
import { sendEmail } from '../actions/resend';

export default function ContactPage() {
	const [response, formAction, isPending] = useActionState(sendEmail, {
		success: false,
		data: null,
		error: undefined,
	});

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
						<CardTitle>Send oss en beskjed</CardTitle>
						<CardDescription>
							Fyll ut skjemaet nedenfor, så kommer vi tilbake til deg så fort som
							mulig.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form action={formAction} className='space-y-4'>
							<div className='grid gap-4 md:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='firstName'>Fornavn</Label>
									<Input id='firstName' name='firstName' placeholder='John' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='lastName'>Etternavn</Label>
									<Input id='lastName' name='lastName' placeholder='Doe' />
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>E-post</Label>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='john.doe@example.com'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Telefon (Valgfritt)</Label>
								<Input
									id='phone'
									name='phone'
									type='tel'
									placeholder='456 78 910'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='inquiry-type'>Type henvendelse</Label>
								<Select defaultValue='general' name='inq_type'>
									<SelectTrigger id='inquiry-type' name='inq_type'>
										<SelectValue placeholder='Velg en type henvendelse' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='general'>
											Generell henvendelse
										</SelectItem>
										<SelectItem value='sales'>Salg</SelectItem>
										<SelectItem value='support'>Teknisk Support</SelectItem>
										<SelectItem value='billing'>Betaling</SelectItem>
										<SelectItem value='partnership'>Partnerskap</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='message'>Beskjed</Label>
								<Textarea
									id='message'
									name='message'
									placeholder='Hvordan kan vi hjelpe deg?'
									className='min-h-[120px]'
								/>
							</div>
							<Button type='submit' className='w-full'>
								Send melding
							</Button>
						</form>
						{response.success && (
							<div className='mt-4 p-4 bg-green-50 text-green-700 rounded-lg'>
								<p>Meldingen din har blitt sendt!</p>
							</div>
						)}
						{response.error !== undefined && (
							<div className='mt-4 p-4 bg-red-50 text-red-700 rounded-lg'>
								<p>Noe gikk galt. Vennligst prøv igjen senere.</p>
							</div>
						)}
					</CardContent>
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
						{/* <div className='flex items-start space-x-3'>
							<Clock className='h-5 w-5 text-primary mt-0.5' />
							<div>
								<p className='font-medium'>Lørdag / Søndag</p>
								<p className='text-muted-foreground'>10:00 AM - 2:00 PM EST</p>
							</div>
						</div> */}
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
