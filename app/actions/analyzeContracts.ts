'use server';

import { OpenAI } from 'openai';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

// Ensure environment variables are loaded
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define types for function responses
interface ContractAnalysisResult {
	analysis?: any;
	// analysis?: string;
	error?: string;
}

export async function analyzeContract(formData: FormData): Promise<ContractAnalysisResult> {
	const file = formData.get('contract') as File | null;

	if (!file) {
		return { error: 'Please upload a valid file.' };
	}

	try {
		// Step 1: Save File Temporarily
		const filePath = path.join('/tmp', `${randomUUID()}-${file.name}`);
		const fileBuffer = Buffer.from(await file.arrayBuffer());
		await writeFile(filePath, fileBuffer);

		// Step 2: Upload File to OpenAI
		const uploadedFile = await openai.files.create({
			file: new File([await readFile(filePath)], file.name, { type: file.type }),
			purpose: 'user_data',
		});

		console.log('File uploaded to OpenAI:', uploadedFile.id);

		// Step 3: Create a Thread for OpenAI Assistant and Attach File
		const thread = await openai.beta.threads.create({
            tool_resources: {
                code_interpreter: {
                    file_ids: [uploadedFile.id],
                },
            }
        });

		// Step 4: Start a Run
        if (!process.env.OPENAI_ASSISTANT_ID) {
            throw new Error('OPENAI_ASSISTANT_ID is not defined');
        }
		const run = await openai.beta.threads.runs.create(thread.id, {
			assistant_id: process.env.OPENAI_ASSISTANT_ID,
		});

		// Step 5: Poll for Completion (Fixed: Include run.id)
		let runStatus;
		do {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
			console.log(`Run Status: ${runStatus.status}`);
		} while (runStatus.status !== 'completed');

		// Step 6: Fetch the Assistant's Response
		const messages = await openai.beta.threads.messages.list(thread.id);
		// const assistantReply = messages.data.find((msg) => msg.role === 'assistant');

        // Step 7: Filter the messages and clean up the response object
        const responseObj = messages.data.filter((msg) => msg.role === 'assistant')

        console.log('Messages found with the threadId and RunId:', JSON.stringify(messages));
        

		return { analysis: responseObj[0] || 'No response from AI, or something went wrong in our system.' };
	} catch (error) {
		console.error('Error analyzing contract:', error);
		return { error: 'Something went wrong. Please try again later.' };
	}
}

