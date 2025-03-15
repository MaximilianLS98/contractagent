import {
	ArrowRight,
	CheckCircle,
	Shield,
	Clock,
	Brain,
	Upload,
	Search,
	FileCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col'>
			<main className='flex-1'>
				{/* Hero Section */}
				<section className='relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-background/80'>
					<div className='container px-4 md:px-6'>
						<div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
							<div className='flex flex-col justify-center space-y-4'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
										AI-drevet juridisk kontraktanalyse:
										<span className='text-primary'>
											{' '}
											Raskere. Smartere. Mer pålitelig.
										</span>
									</h1>
									<p className='max-w-[600px] text-muted-foreground md:text-xl'>
										Spar timer med manuell gjennomgang. La AI identifisere
										juridiske risikoer og flagge potensielle problemer i
										kontrakter øyeblikkelig.
									</p>
								</div>
								<div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link href='/livedemo'>
									<Button size='lg' className='bg-primary hover:bg-primary/90'>
										Be om en live demo <ArrowRight className='ml-2 h-4 w-4' />
									</Button>
                  </Link>
                  <Link href='/upload'>
									<Button size='lg' variant='outline'>
										Se demo
									</Button>
                  </Link>
									<Button size='lg' variant='secondary'>
										Lær mer
									</Button>
								</div>
							</div>
							<div className='flex items-center justify-center'>
								<div className='relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]'>
									<div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 blur-3xl'></div>
									<div className='relative h-full w-full rounded-xl border border-border bg-background/80 p-4 backdrop-blur'>
										<div className='flex h-full w-full flex-col items-center justify-center rounded-lg border border-border bg-background p-6'>
											<div className='flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6'>
												<Brain className='h-10 w-10 text-primary' />
											</div>
											<div className='space-y-2 text-center'>
												<h3 className='text-xl font-semibold'>
													AI-drevet analyse
												</h3>
												<p className='text-sm text-muted-foreground'>
													Vår avanserte AI gjennomgår juridiske dokumenter
													med presisjon og hastighet, og identifiserer
													risikoer på sekunder.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* How It Works */}
				<section id='how-it-works' className='py-16 md:py-24 bg-muted/50'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Enkel prosess
								</div>
								<h2 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Hvordan det fungerer
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Vår AI-drevne plattform forenkler juridisk dokumentverifisering
									i tre enkle trinn.
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
							<div className='flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Upload className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-semibold'>1. Last opp dokument</h3>
								<p className='text-center text-muted-foreground'>
									Last enkelt opp ditt juridiske dokument gjennom vår sikre
									plattform.
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<Search className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-semibold'>2. AI-analyse</h3>
								<p className='text-center text-muted-foreground'>
									Vår AI skanner og analyserer dokumentet for potensielle
									juridiske risikoer.
								</p>
							</div>
							<div className='flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md'>
								<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
									<FileCheck className='h-8 w-8 text-primary' />
								</div>
								<h3 className='text-xl font-semibold'>3. Motta rapport</h3>
								<p className='text-center text-muted-foreground'>
									Få en detaljert analyserapport med flaggede problemer på
									minutter.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Key Features */}
				<section id='features' className='py-16 md:py-24'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Kraftige funksjoner
								</div>
								<h2 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Nøkkelfunksjoner
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Vår AI-drevne plattform tilbyr omfattende analyse av juridiske
									dokumenter med disse nøkkelfunksjonene.
								</p>
							</div>
						</div>
						<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12'>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>Risikoidentifisering</h3>
								</div>
								<p className='text-muted-foreground'>
									AI flagger klausuler med potensielle juridiske risikoer, og
									fremhever områder som trenger oppmerksomhet.
								</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>
										Kontekstbevisste innsikter
									</h3>
								</div>
								<p className='text-muted-foreground'>
									Fremhever vage eller problematiske formuleringer med
									kontekstuell forståelse av juridisk språk.
								</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>
										Hastighet og nøyaktighet
									</h3>
								</div>
								<p className='text-muted-foreground'>
									Analyserer kontrakter på sekunder, reduserer menneskelig
									arbeidsmengde samtidig som høy nøyaktighet opprettholdes.
								</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>
										Tilpassbare gjennomganger
									</h3>
								</div>
								<p className='text-muted-foreground'>
									Sett spesifikke parametere for å matche ditt advokatfirmas krav
									og standarder.
								</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>
										Sikker og konfidensiell
									</h3>
								</div>
								<p className='text-muted-foreground'>
									Ende-til-ende-kryptering for å beskytte sensitive dokumenter og
									klientinformasjon.
								</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<div className='flex items-center space-x-2'>
									<CheckCircle className='h-5 w-5 text-primary' />
									<h3 className='text-xl font-semibold'>Integrasjonsklar</h3>
								</div>
								<p className='text-muted-foreground'>
									Integreres sømløst med din eksisterende juridiske programvare og
									dokumenthåndteringssystemer.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Why Choose Our AI */}
				<section id='why-choose' className='py-16 md:py-24 bg-muted/50'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Konkurransefortrinn
								</div>
								<h2 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Hvorfor velge vår AI?
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Se hvordan vår AI-drevne løsning sammenlignes med tradisjonelle
									manuelle gjennomgangsprosesser.
								</p>
							</div>
						</div>
						<div className='mx-auto max-w-5xl py-12'>
							<Tabs defaultValue='time' className='w-full'>
								<TabsList className='grid w-full grid-cols-3'>
									<TabsTrigger value='time'>Tidsbesparelse</TabsTrigger>
									<TabsTrigger value='cost'>Kostnadseffektivitet</TabsTrigger>
									<TabsTrigger value='accuracy'>Nøyaktighet</TabsTrigger>
								</TabsList>
								<TabsContent value='time' className='p-6 border rounded-lg mt-6'>
									<div className='grid gap-6 lg:grid-cols-2'>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border'>
											<div className='flex items-center space-x-2'>
												<Clock className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													Tradisjonell gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												En 50-siders kontrakt tar i gjennomsnitt 5-7 timer
												for manuell gjennomgang av en juridisk fagperson.
											</p>
											<div className='text-3xl font-bold'>5-7 timer</div>
										</div>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border border-primary'>
											<div className='flex items-center space-x-2'>
												<Brain className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													AI-drevet gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												Vår AI analyserer den samme 50-siders kontrakten på
												minutter, med menneskelig gjennomgang kun for
												flaggede problemer.
											</p>
											<div className='text-3xl font-bold text-primary'>
												15-30 minutter
											</div>
										</div>
									</div>
								</TabsContent>
								<TabsContent value='cost' className='p-6 border rounded-lg mt-6'>
									<div className='grid gap-6 lg:grid-cols-2'>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border'>
											<div className='flex items-center space-x-2'>
												<Clock className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													Tradisjonell gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												Gjennomsnittlig kostnad på 3000-5000 kr per time for
												gjennomgang av advokatfullmektig.
											</p>
											<div className='text-3xl font-bold'>
												15 000-35 000 kr
											</div>
											<p className='text-sm text-muted-foreground'>
												Per kontrakt
											</p>
										</div>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border border-primary'>
											<div className='flex items-center space-x-2'>
												<Brain className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													AI-drevet gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												Abonnementsbasert prising med ubegrenset
												dokumentanalyse.
											</p>
											<div className='text-3xl font-bold text-primary'>
												2000-4000 kr
											</div>
											<p className='text-sm text-muted-foreground'>
												Per måned, ubegrensede kontrakter
											</p>
										</div>
									</div>
								</TabsContent>
								<TabsContent
									value='accuracy'
									className='p-6 border rounded-lg mt-6'>
									<div className='grid gap-6 lg:grid-cols-2'>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border'>
											<div className='flex items-center space-x-2'>
												<Clock className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													Tradisjonell gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												Menneskelig gjennomgangs nøyaktighet varierer basert
												på erfaring, tretthet og tidsbegrensninger.
											</p>
											<div className='text-3xl font-bold'>85-95%</div>
											<p className='text-sm text-muted-foreground'>
												Nøyaktighetsgrad (varierer etter gjennomgåer)
											</p>
										</div>
										<div className='flex flex-col space-y-4 p-6 bg-background rounded-lg border border-primary'>
											<div className='flex items-center space-x-2'>
												<Brain className='h-5 w-5 text-primary' />
												<h3 className='text-xl font-semibold'>
													AI-drevet gjennomgang
												</h3>
											</div>
											<p className='text-muted-foreground'>
												Konsistent nøyaktighet med kontinuerlig læring fra
												tilbakemeldinger fra juridiske fagpersoner.
											</p>
											<div className='text-3xl font-bold text-primary'>
												98%+
											</div>
											<p className='text-sm text-muted-foreground'>
												Nøyaktighetsgrad (forbedres kontinuerlig)
											</p>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</div>
						<div className='mx-auto max-w-3xl space-y-8'>
							<div className='space-y-4'>
								<h3 className='text-2xl font-serif font-bold'>
									Hva våre tidlige brukere sier
								</h3>
								<div className='grid gap-6 md:grid-cols-2'>
									<div className='rounded-lg border bg-background p-6'>
										<div className='flex items-start space-x-4'>
											<div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
												<span className='text-primary font-semibold'>
													JD
												</span>
											</div>
											<div className='space-y-1'>
												<h4 className='font-semibold'>Jessica Donovan</h4>
												<p className='text-sm text-muted-foreground'>
													Administrerende partner, Donovan Legal
												</p>
											</div>
										</div>
										<p className='mt-4 text-muted-foreground'>
											"Dette AI-verktøyet har transformert vår
											kontraktgjennomgangsprosess. Det som pleide å ta dager
											tar nå timer, noe som lar våre advokater fokusere på
											arbeid med høyere verdi."
										</p>
									</div>
									<div className='rounded-lg border bg-background p-6'>
										<div className='flex items-start space-x-4'>
											<div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
												<span className='text-primary font-semibold'>
													MR
												</span>
											</div>
											<div className='space-y-1'>
												<h4 className='font-semibold'>Michael Rodriguez</h4>
												<p className='text-sm text-muted-foreground'>
													Juridisk operasjonsdirektør, Global Corp
												</p>
											</div>
										</div>
										<p className='mt-4 text-muted-foreground'>
											"Nøyaktigheten i risikoidentifiseringen har vært
											imponerende. Vi har fanget opp flere kritiske problemer
											som kunne ha blitt oversett i vår standard
											gjennomgangsprosess."
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-16 md:py-24'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h2 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Klar til å transformere din juridiske dokumentgjennomgang?
								</h2>
								<p className='max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Bli med ledende advokatfirmaer som allerede sparer hundrevis av
									timer på kontraktgjennomgang.
								</p>
							</div>
							<div className='flex flex-col gap-2 min-[400px]:flex-row'>
								<Button size='lg' className='bg-primary hover:bg-primary/90'>
									Be om en demo <ArrowRight className='ml-2 h-4 w-4' />
								</Button>
								<Button size='lg' variant='outline'>
									Kontakt salg
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section id='faq' className='py-16 md:py-24 bg-muted/50'>
					<div className='container px-4 md:px-6'>
						<div className='flex flex-col items-center justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Vanlige spørsmål
								</div>
								<h2 className='text-3xl font-serif font-bold tracking-tighter sm:text-4xl md:text-5xl'>
									Ofte stilte spørsmål
								</h2>
								<p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
									Finn svar på vanlige spørsmål om vår AI-drevne juridiske
									dokumentverifisering.
								</p>
							</div>
						</div>
						<div className='mx-auto max-w-3xl py-12'>
							<Accordion type='single' collapsible className='w-full'>
								<AccordionItem value='item-1'>
									<AccordionTrigger>
										Hvor nøyaktig er AI-en i å identifisere juridiske risikoer?
									</AccordionTrigger>
									<AccordionContent>
										Vår AI har blitt trent på millioner av juridiske dokumenter
										og oppnår over 98% nøyaktighet i å identifisere vanlige
										juridiske risikoer og problemer. Systemet forbedres
										kontinuerlig gjennom maskinlæring og tilbakemeldinger fra
										juridiske fagpersoner.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-2'>
									<AccordionTrigger>
										Er mine data sikre og konfidensielle?
									</AccordionTrigger>
									<AccordionContent>
										Absolutt. Vi bruker ende-til-ende-kryptering og strenge
										datasikkerhetsprotokoll. Dine dokumenter lagres aldri
										permanent, og vi overholder alle relevante
										databeskyttelsesforskrifter inkludert GDPR. Vi tilbyr også
										on-premise distribusjonsalternativer for firmaer med
										strengere sikkerhetskrav.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-3'>
									<AccordionTrigger>
										Hvilke typer juridiske dokumenter kan AI-en analysere?
									</AccordionTrigger>
									<AccordionContent>
										Vår AI kan analysere et bredt spekter av juridiske
										dokumenter inkludert kontrakter, taushetserklæringer,
										ansettelsesavtaler, leieavtaler, tjenestevilkår,
										personvernregler og mer. Systemet er spesielt effektivt med
										standardiserte juridiske dokumenter, men kan også håndtere
										tilpassede avtaler.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-4'>
									<AccordionTrigger>
										Hvordan håndterer AI-en ulike jurisdiksjoner?
									</AccordionTrigger>
									<AccordionContent>
										AI-en er trent på juridiske dokumenter fra flere
										jurisdiksjoner inkludert amerikanske føderale og statlige
										lover, EU-forskrifter og britisk lov. Du kan spesifisere den
										relevante jurisdiksjonen når du laster opp dokumenter, og
										AI-en vil anvende de passende juridiske standardene og
										hensynene.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-5'>
									<AccordionTrigger>
										Kan AI-en erstatte vårt juridiske team?
									</AccordionTrigger>
									<AccordionContent>
										Nei, vår AI er designet for å supplere ditt juridiske team,
										ikke erstatte det. AI-en håndterer den tidkrevende
										innledende gjennomgangen og flagger potensielle problemer,
										noe som lar dine juridiske fagpersoner fokusere sin
										ekspertise på analyse, strategi og klientrådgivning. Det er
										et verktøy som gjør ditt juridiske team mer effektivt og
										effektivt.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value='item-6'>
									<AccordionTrigger>
										Hvilke integrasjoner er tilgjengelige?
									</AccordionTrigger>
									<AccordionContent>
										Vår plattform integreres med populære juridiske
										dokumenthåndteringssystemer inkludert Clio, DocuSign,
										iManage og NetDocuments. Vi tilbyr også API-tilgang for
										tilpassede integrasjoner med dine eksisterende arbeidsflyter
										og systemer.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</section>
			</main>

			<footer className='border-t bg-background'>
				<div className='container px-4 py-12 md:px-6 md:py-16 lg:py-20'>
					<div className='grid gap-8 lg:grid-cols-4'>
						<div className='space-y-4'>
							<div className='flex items-center gap-2'>
								<Shield className='h-6 w-6 text-primary' />
								<span className='text-xl font-semibold tracking-tight'>
									JuridiskVerifisering AI
								</span>
							</div>
							<p className='text-sm text-muted-foreground'>
								AI-drevet juridisk dokumentverifisering for moderne advokatfirmaer.
							</p>
							<div className='flex space-x-4'>
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
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
								<Link
									href='#'
									className='text-muted-foreground hover:text-foreground'>
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
										href='#'
										className='text-muted-foreground hover:text-foreground'>
										Vilkår for tjenesten
									</Link>
								</li>
								<li>
									<Link
										href='#'
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
						<p>© 2025 JuridiskVerifisering AI. Alle rettigheter reservert.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
