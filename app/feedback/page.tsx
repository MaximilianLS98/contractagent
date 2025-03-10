import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function FeedbackPage() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Dokumentanalyse resultater</CardTitle>
					<CardDescription>
						AI-generert analyse av ditt juridiske dokument
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4 md:grid-cols-3'>
						<div className='flex items-center space-x-2'>
							<AlertTriangle className='h-5 w-5 text-yellow-500' />
							<span>3 potensielle risikoer identifisert</span>
						</div>
						<div className='flex items-center space-x-2'>
							<CheckCircle className='h-5 w-5 text-green-500' />
							<span>2 anbefalte endringer</span>
						</div>
						<div className='flex items-center space-x-2'>
							<Info className='h-5 w-5 text-blue-500' />
							<span>1 uvanlig klausul oppdaget</span>
						</div>
					</div>
					<p className='mt-4 text-sm text-muted-foreground'>
						Totalt analysert: 10 sider, 4,532 ord
					</p>
				</CardContent>
			</Card>

			<Tabs defaultValue='feedback' className='mb-8'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='document'>Dokumentinnhold</TabsTrigger>
					<TabsTrigger value='feedback'>Detaljert feedback</TabsTrigger>
				</TabsList>
				<TabsContent value='document'>
					<Card>
						<CardContent className='pt-6'>
							<pre className='font-mono text-sm whitespace-pre-wrap bg-muted p-4 rounded-md'>
								{`KONTRAKT OM TJENESTEYTING

1. PARTER
Denne avtalen er inngått mellom:
[Kunde AS] (heretter kalt "Kunden")
og
[Leverandør AS] (heretter kalt "Leverandøren")

2. TJENESTENS OMFANG
<span className="bg-yellow-200">Leverandøren skal levere følgende tjenester til Kunden:
[Detaljert beskrivelse av tjenestene]
Leverandøren forplikter seg til å utføre tjenestene i henhold til bransjestandarder og god praksis.</span>

3. VARIGHET
<span className="bg-green-200">Denne avtalen trer i kraft fra [startdato] og løper til [sluttdato], med mindre den sies opp tidligere i henhold til avtalens bestemmelser.</span>

4. VEDERLAG
Kunden skal betale Leverandøren følgende for tjenestene:
[Detaljert prisoversikt]
<span className="bg-yellow-200">Betalingsbetingelser: 30 dager netto fra fakturadato.</span>

5. ANSVARSBEGRENSNING
<span className="bg-blue-200">Leverandørens totale ansvar under denne avtalen skal ikke overstige det totale beløpet betalt av Kunden for tjenestene i løpet av de siste 12 månedene før kravet oppsto.</span>

6. KONFIDENSIALITET
Begge parter forplikter seg til å behandle all informasjon mottatt fra den andre parten som strengt konfidensiell.

7. OPPSIGELSE
<span className="bg-green-200">Hver part kan si opp denne avtalen med 60 dagers skriftlig varsel.</span>

8. LOVVALG OG VERNETING
Denne avtalen er underlagt norsk lov. Eventuelle tvister skal løses ved Oslo tingrett.

Signert:

________________________                    ________________________
For [Kunde AS]                               For [Leverandør AS]
Dato:                                        Dato:
`}
							</pre>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='feedback'>
					<Card>
						<CardContent className='pt-6 space-y-4'>
							<div className='space-y-2'>
								<h3 className='font-semibold flex items-center'>
									<AlertTriangle className='h-5 w-5 text-yellow-500 mr-2' />
									Risiko 1
								</h3>
								<p>
									Tjenestens omfang er ikke tilstrekkelig spesifisert. Dette kan
									føre til uenigheter om leveransens innhold.
								</p>
								<Badge
									variant='outline'
									className='text-yellow-500 border-yellow-500'>
									Seksjon 2
								</Badge>
							</div>
							<div className='space-y-2'>
								<h3 className='font-semibold flex items-center'>
									<AlertTriangle className='h-5 w-5 text-yellow-500 mr-2' />
									Risiko 2
								</h3>
								<p>
									Betalingsbetingelsene kan være for lange. Vurder å redusere til
									14 dager for bedre likviditetsstyring.
								</p>
								<Badge
									variant='outline'
									className='text-yellow-500 border-yellow-500'>
									Seksjon 4
								</Badge>
							</div>
							<div className='space-y-2'>
								<h3 className='font-semibold flex items-center'>
									<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
									Anbefaling 1
								</h3>
								<p>
									Spesifiser varigheten mer presist, for eksempel med eksakte
									datoer.
								</p>
								<Badge
									variant='outline'
									className='text-green-500 border-green-500'>
									Seksjon 3
								</Badge>
							</div>
							<div className='space-y-2'>
								<h3 className='font-semibold flex items-center'>
									<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
									Anbefaling 2
								</h3>
								<p>
									Vurder å legge til en klausul om force majeure for å beskytte
									begge parter mot uforutsette hendelser.
								</p>
								<Badge
									variant='outline'
									className='text-green-500 border-green-500'>
									Ny seksjon
								</Badge>
							</div>
							<div className='space-y-2'>
								<h3 className='font-semibold flex items-center'>
									<Info className='h-5 w-5 text-blue-500 mr-2' />
									Uvanlig klausul
								</h3>
								<p>
									Ansvarsbegrensningen er uvanlig formulert. Vurder å spesifisere
									et fast beløp i stedet for en rullerende 12-måneders periode.
								</p>
								<Badge variant='outline' className='text-blue-500 border-blue-500'>
									Seksjon 5
								</Badge>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<div className='flex justify-center gap-4'>
				<Link href='#'>
					<Button variant='default'>Last ned rapport</Button>
				</Link>
				<Link href='/upload'>
					<Button variant='outline'>Last opp et nytt dokument</Button>
				</Link>
			</div>
		</div>
	);
}
