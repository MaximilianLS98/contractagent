'use server';

import { OpenAI } from 'openai';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import pdfParse from 'pdf-parse';
// import pdf from 'pdf-parse/lib/pdf-parse';
import { unlink } from 'fs';


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ExtractTextFromPDF {
    (filePath: string): Promise<string>;
}

const extractTextFromPDF: ExtractTextFromPDF = async (filePath: string): Promise<string> => {
    try {
        const dataBuffer = await readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to extract text from PDF: ${error.message}`);
        } else {
            throw new Error('Failed to extract text from PDF: Unknown error');
        }
    }
};


export async function analyzeTXTContract(formData:FormData) {
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
		} while (runStatus.status !== 'completed');

        const messages = await openai.beta.threads.messages.list(thread.id);
        console.log(`Messages for thread ${thread.id}:`, JSON.stringify(messages));

        const responseObj = messages.data.filter((msg) => msg.role === 'assistant');

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