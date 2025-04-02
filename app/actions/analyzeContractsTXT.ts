'use server';

import { OpenAI } from 'openai';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import pdfParse from 'pdf-parse';
// import pdf from 'pdf-parse/lib/pdf-parse';
import { unlink } from 'fs';
import { createAdminClient } from '@/appwrite/config';
import { currentUser } from '@clerk/nextjs/server';
import { Query } from 'node-appwrite';
import { TOKENS_PER_QUERY } from '@/config';
import { revalidateTag } from 'next/cache';
import PostHogClient from '@/posthog';

const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Doing this because pdf-parse is not maintained and the types are not up to date
interface ExtractTextFromPDF {
    (filePath: string): Promise<string>;
}

// Take the interface from the pdf-parse and append pageData to the Result interface
interface extendedResult extends pdfParse.Result {
    pageData: PageData[];
}

const extractTextFromPDF: ExtractTextFromPDF = async (filePath: string): Promise<string> => {
    // console.log('Extracting text from PDF:', filePath);
    try {
        const dataBuffer = await readFile(filePath);
        const pdfData = await pdfParse(dataBuffer) as extendedResult;
        // console.log('PDF data:', pdfData);
        const joinedPageData = pdfData.pageData.map((page: PageData) => page).join('\n');
        // console.log('Joined page data:', joinedPageData);
        return joinedPageData;
        // return pdfData.pageData.map((page: PageData) => page).join('\n');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to extract text from PDF: ${error.message}`);
        } else {
            throw new Error('Failed to extract text from PDF: Unknown error');
        }
    }
};


export async function analyzeTXTContract(formData:FormData) {

    // check if the user has any document_quota_left before proceeding, needs to check in the appwrite database based on the users clerk id
    // if the user has no document_quota_left, return an error message to the user and redirect them to the payment page
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
        return { error: 'User ID is missing' };
    }
    const { databases } = await createAdminClient();

    const getUserQuotaObject = async () => {
        const userQuota = await databases.listDocuments(dbId, collectionId, [
            Query.equal('clerk_user_id', [userId as string]),
        ]);
        return userQuota.documents[0];
    }
    const userQuota = await getUserQuotaObject();
    if (userQuota.document_quota_left === 0) {
        return { data: null, error: 'Du er tom for tokens, for å analysere flere dokumenter må du kjøpe flere.' };
    }

    const file = formData.get('contract') as File | null;

    if (!file) {
        return { error: 'Please upload a valid file.' };
    }
    // save file temporarily
    const filePath = path.join('/tmp', `${randomUUID()}-${file.name}`);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);

    const fileAsText = await extractTextFromPDF(filePath);

    try {
        const thread = await openai.beta.threads.create({
            messages: [
                {
                    role: 'user',
                    content: 'Please analyse this contract.',
                },
                {
                    role: 'user',
                    content: fileAsText,
                }
            ]
        });

        if (!process.env.OPENAI_ASSISTANT_ID) {
            throw new Error('OPENAI_ASSISTANT_ID is not defined');
        }
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: process.env.OPENAI_ASSISTANT_ID,
        });

        let runStatus;
        do {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
            // console.log(`Run status, fires every 2 seconds:`, JSON.stringify(runStatus.status));
		} while (runStatus.status !== 'completed');

        const messages = await openai.beta.threads.messages.list(thread.id);
        // console.log(`Messages for thread ${thread.id}:`, JSON.stringify(messages));

        const responseObj = messages.data.filter((msg) => msg.role === 'assistant');

        // We need to update the user's document_quota_left in the appwrite database as well as increment documents_analysed field 
        const updatedUserQueryObj = await databases.updateDocument(dbId, collectionId, userQuota.$id, {
            document_quota_left: userQuota.document_quota_left - TOKENS_PER_QUERY,
            documents_analysed: userQuota.documents_analysed + 1,
        });
        console.log(`Updated user query object:`, updatedUserQueryObj);

        const posthog = PostHogClient();
        posthog.capture({
            distinctId: userId as string,
            event: 'Document Analyzed',
            properties: {
                document_type: 'contract',
                document_name: file.name,
            },
        });
        await posthog.shutdown();

        revalidateTag('tokens');

        return { data: responseObj[0], error: null };

    }
    catch (error) {
        console.error(error);
        return { data: null, error };
    } finally {
        await unlink(filePath, (err) => {
            if (err) throw err;
        });
    }
}

const examplePageData = [
    'Arbeidsavtale\n' +
      'Beholdesavarbeidsgiver–kopitilarbeidstaker\n' +
      '1.Firma\n' +
      'NavnDagligleder\n' +
      'WAYSAS(832175692)KnutMichaelKnutsenHaugland\n' +
      'Adresse\n' +
      'Rådhusgata5B,0151Oslo\n' +
      '2.Ansatt\n' +
      'Navn\n' +
      'Maximilian Skjønhaug\n' +
      'Adresse\n' +
      'Pilestredet29a,0166Oslo\n' +
      'Maximilian Skjønhaug\n' +
      '3.Arbeidsplass(jf.arbeidsmiljøloven§14-6(1)b)\n' +
      'Adresse\n' +
      'Rådhusgata5B,0151Oslo\n' +
      '4.Ansattsom(arb.oppgaver/stilling/tittel/arbeidskategori)\n' +
      'Systemutvikler\n' +
      '5.Tariffavtale/verneombud\n' +
      'Følgendetariffavtale(r)gjelder\n' +
      '     \n' +
      'TariffparterVerneombud\n' +
      '          \n' +
      'Sjekkallepunkternedenformedtariffavtalen\n' +
      '6.Ansettelsesforholdetsvarighetogarbeidstid\n' +
      'AnsattfraEventuelttil\n' +
      '23.09.2023     \n' +
      'Ukentligarbeidstid(lengde/plassering)Dagligarbeidstid(lengde/plassering)\n' +
      '37,5t     \n' +
      'EventuellsærligarbeidstidsordningPauser(lengde)\n' +
      '30min\n' +
      'ArbeidstakersoppsigelsesfristArbeidsgiversoppsigelsesfrist\n' +
      'Tremånedertremåneder\n' +
      'Ferietid,fastsettesihenholdtilferielovensbestemmelser\n' +
      '     5uker\n' +
      '7.Eventuellprøvetid\n' +
      'PrøvetidenslengdeOppsigelsesfristiprøvetiden\n' +
      'Ev.forlengelseavprøvetid(jf.arbeidsmiljøloven§15-6(4))\n' +
      '     \n' +
      '8.Lønn\n' +
      'LønnpermånedUtbetalingsmåteUtbetalingstidspunkt\n' +
      '55000,-Bank     D.25.etterskuddsvis\n' +
      'Overtidstillegg(min.40%)Helge-/nattilleggAndretillegg\n' +
      '250300          \n' +
      'Godtgjørelse/diett\n' +
      '     \n' +
      'Feriepengerkommeritilleggtillønn,jf.ferieloven\n' +
      '     12%\n' +
      '9.Andreopplysninger\n' +
      'Tilleggpåansattgoder,beskrevetipersonalhåndbok.2%pensjon.Oppjusteringijanuar,medutbetalingavdifferansenpå\n' +
      '5000permånedforrestenav2023.\n' +
      '10.Underskrifter\n' +
      'DatoUnderskriftarbeidsgiverUnderskriftarbeidstaker\n' +
      '23.09.2023          \n' +
      '563-B(Godkj.07-2006)Elektroniskutgave\n' +
      'Maximilian Skjønhaug\n' +
      'Knut Michael Haugland\n' +
      'Dette dokumentet er signert ved hjelp av GetAccept Digital Signature Technology.\n' +
      'Fingerprint: 4fb497974a151a783ca4f9489e83a11ee7c61d9ecc89b59d7252b432f14627e66986ebf3836b4ff9f5bdee3db5e8b3113927f8c29abc0b36db45ceb5b2f154d3',
    'Dette dokumentet er signert ved hjelp av GetAccept Digital Signature Technology.\n' +
      'Fingerprint: 4fb497974a151a783ca4f9489e83a11ee7c61d9ecc89b59d7252b432f14627e66986ebf3836b4ff9f5bdee3db5e8b3113927f8c29abc0b36db45ceb5b2f154d3',
    'Signatur sertifikat\n' +
      'Dokumentnavn:\n' +
      '23.09.2023-Maximilian Skjønhaug\n' +
      'Unikt dokument ld:\n' +
      'c97951c6-65f1-452f-ad55-50ee1d3cf5af\n' +
      'Dokument fingeravtrykk:\n' +
      '4fb497974a151a783ca4f9489e83a11ee7c61d9ecc89b59d7252b432f14627e66986ebf3836b4ff9f5bdee\n' +
      '3db5e8b3113927f8c29abc0b36db45ceb5b2f154d3\n' +
      'Undertegnede\n' +
      'Maximilian Skjønhaug\n' +
      'E-post:maximilian.skjonhaug@ways.no\n' +
      'Enhet:Chrome 118.0.0.0 on Unknown macOS 10.15.7\n' +
      '(desktop)\n' +
      'IP adresse:89.10.127.218\n' +
      'Tillitsfullt tidsstempel:\n' +
      '2023-11-13 13:39:25 UTC\n' +
      'Maximilian Skjønhaug\n' +
      'Knut Michael Haugland\n' +
      'CEO\n' +
      'WAYS (920915019)\n' +
      'E-post:knut@ways.no\n' +
      'Enhet:Chrome 119.0.0.0 on Unknown macOS 10.15.7\n' +
      '(desktop)\n' +
      'IP adresse:\n' +
      'Bekreftet med logg inn\n' +
      'Tillitsfullt tidsstempel:\n' +
      '2023-11-13 13:28:54 UTC\n' +
      'Dette dokumentet ble gjennomført av alle parter på:\n' +
      '2023-11-13 13:39:25 UTC\n' +
      'Dette dokumentet er signert ved hjelp av GetAccept Digital Signature Technology.\n' +
      'Dette signaturbeviset gir alle signaturer knyttet til dette dokumentet og revisjonsloggen.',
    'Revisjonslogg\n' +
      'Tillitsfullt tidsstempelHendelse med innsamlede revisjonsdato\n' +
      '2023-11-13 13:39:25 UTCDokument ble signert av Maximilian Skjønhaug\n' +
      '(maximilian.skjonhaug@ways.no)\n' +
      'Enhet: Chrome 118.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 89.10.127.218 - IP Lokasjon: Oslo, Norway\n' +
      '2023-11-13 13:39:20 UTCDokument ble godkjent via håndskrevet signatur av Maximilian Skjønhaug\n' +
      '(maximilian.skjonhaug@ways.no)\n' +
      'Enhet: Chrome 118.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 89.10.127.218 - IP Lokasjon: Oslo, Norway\n' +
      '2023-11-13 13:39:02 UTCDokument ble åpnet av Maximilian Skjønhaug (maximilian.skjonhaug@ways.no)\n' +
      'Enhet: Chrome 118.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 89.10.127.218 - IP Lokasjon: Oslo, Norway\n' +
      '2023-11-13 13:28:59 UTCDokument ble sendt til Maximilian Skjønhaug (maximilian.skjonhaug@ways.no)\n' +
      'Enhet: Chrome 119.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 178.232.20.156 - IP Lokasjon: Oslo, Norway\n' +
      '2023-11-13 13:28:56 UTCDokument ble forseglet av Knut Michael Haugland (knut@ways.no)\n' +
      'Enhet: Chrome 119.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 178.232.20.156 - IP Lokasjon: Oslo, Norway\n' +
      '2023-11-13 13:28:54 UTCDokument ble signert av Knut Michael Haugland (knut@ways.no)\n' +
      'Enhet: Chrome 119.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      '2023-11-13 13:28:54 UTCDokument ble godkjent via håndskrevet signatur av Knut Michael Haugland\n' +
      '(knut@ways.no)\n' +
      'Enhet: Chrome 119.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      '2023-11-13 13:26:52 UTCDokument ble opprettet av Knut Michael Haugland (knut@ways.no)\n' +
      'Enhet: Chrome 119.0.0.0 on Unknown macOS 10.15.7 (desktop)\n' +
      'IP adresse: 178.232.20.156 - IP Lokasjon: Oslo, Norway\n' +
      'Dette dokumentet er signert ved hjelp av GetAccept Digital Signature Technology.\n' +
      'Dette signaturbeviset gir alle signaturer knyttet til dette dokumentet og revisjonsloggen.'
  ]

  type PageData = typeof examplePageData[number];