'use client';
import { useState } from 'react';
// import { analyzeContract } from '@/app/actions/analyzeContracts';
import { analyzeTXTContract } from '@/app/actions/analyzeContractsTXT';
import { listAllThreads } from '@/app/actions/threads';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Card, CardContent, CardHeader } from './ui/card';
import DisclaimerModal from './DisclaimerModal';
import { Button } from './ui/button';
import { Spinner } from './ui/Spinner';
import { Badge } from './ui/badge';
import { AlertTriangle, CheckCircle, Info, Upload, FileText } from 'lucide-react';


// Define types for response data
interface ContractAnalysisResult {
	analysis?: any | null;
	data?: any | null;
	// analysis?: string;
	error?: string | null;
}

export default function ContractUploader() {
	const [file, setFile] = useState<File | null>(null);
	const [result, setResult] = useState<ContractAnalysisResult | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [thread, setThread] = useState<any | null>(null);
	const [accepted, setAccepted] = useState<boolean>(false);
	const [parsedResult, setParsedResult] = useState<any | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			alert('Please select a file first.');
			return;
		}
        if (!accepted) {
            alert('Please accept the disclaimer first.');
            return;
        }

		setLoading(true);
		const formData = new FormData();
		formData.append('contract', file);

		// const response = await analyzeContract(formData);
		const response = (await analyzeTXTContract(formData)) as ContractAnalysisResult;
		// console.log(`Response from analyzeTXTContract:`, JSON.stringify(response));
		setResult(response);
		setParsedResult(JSON.parse(response.data?.content[0].text.value));
		setLoading(false);
		console.log(
			`json response from analyzeTXTContract:`,
			JSON.parse(response.data.content[0].text.value),
		);
	};

    if (result?.error) {
        return (
            <div className='container mx-auto p-4'>
                <Card className='max-w-lg mx-auto my-8 px-4 py-8'>
                    <CardHeader>
                        <h2 className='text-2xl font-bold mb-4'>Error</h2>
                    </CardHeader>
                    <CardContent>
                        <p>{result.error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

	return (
		<div className='container mx-auto p-4'>
			{!accepted && <DisclaimerModal onAccept={() => setAccepted(true)} />}
			<Card className='max-w-lg mx-auto my-8 px-4 py-8'>
				<CardHeader>
					<h2 className='text-2xl font-bold mb-4'>Last opp kontrakten for analyse</h2>
					<p>Last opp ditt juridiske dokument for AI-analyse</p>
				</CardHeader>
				<CardContent>
					<input
						type='file'
						accept='application/pdf'
						onChange={handleFileChange}
						className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4'
					/>
					{file && (
						<div className='flex items-center space-x-2 my-2 text-sm text-muted-foreground'>
							<FileText size={16} />
							<span>{file.name}</span>
						</div>
					)}
					<button
						onClick={handleUpload}
						disabled={loading || !file}
						className={`w-full py-2 px-4 mb-4 text-white font-semibold rounded-lg shadow-md ${
							loading || !file
								? 'bg-gray-400'
								: 'bg-primary hover:bg-blue-900 hover:shadow-lg'
							// loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
						}`}>
						{loading ? (
							<div className='flex flex-row items-center justify-center gap-2'>
								<Spinner className='text-black' />
								<span>Analyserer...</span>
							</div>
						) : (
							'Analyser'
						)}
					</button>
					<div className='w-full flex justify-center '>
						<Button
							variant='link'
							className='mx-auto'
							onClick={() => setAccepted(false)}>
							ansvarsfraskrivelse
						</Button>
					</div>
				</CardContent>
			</Card>
			{result && (
				<div className='mt-4 p-4 bg-gray-100 rounded-lg'>
					<h3 className='text-xl font-semibold mb-2'>Analysis Result:</h3>
					{/* <pre>{JSON.stringify(result, null, 4)}</pre> */}
					{/* <pre>{JSON.stringify(parsedResult, null, 4)}</pre> */}
					<h2 className='text-lg font-semibold mt-6'>Viktige klausuler</h2>
					{parsedResult.critical_clauses.map((clause: string, index: number) => {
						return (
							<div className='my-4' key={`${index}critical`}>
								<h3 className='font-semibold flex items-center'>
									<AlertTriangle className='h-5 w-5 text-yellow-500 mr-2' />
									Risiko {index + 1}
								</h3>
								<p>{clause}</p>
								<Badge
									variant='outline'
									className='text-yellow-500 border-yellow-500'>
									Seksjon 2
								</Badge>
							</div>
							// <div key={index} className='bg-red-200 p-2 my-2 rounded-lg'>
							//     <p>{clause}</p>
							// </div>
						);
					})}
					<h2 className='text-lg font-semibold mt-6'>Forslag til endringer</h2>
					{parsedResult.suggestions.map((suggestion: string, index: number) => {
						return (
							<div className='my-4' key={`${index}suggestions`}>
								<h3 className='font-semibold flex items-center'>
									<CheckCircle className='h-5 w-5 text-green-500 mr-2' />
									Anbefaling {index + 1}
								</h3>
								<p>{suggestion}</p>
								<Badge
									variant='outline'
									className='text-green-500 border-green-500'>
									Seksjon 3
								</Badge>
							</div>
							// <div key={index} className='bg-yellow-200 p-2 my-2 rounded-lg'>
							//     <p>{suggestion}</p>
							// </div>
						);
					})}
					<h2 className='text-lg font-semibold mt-6'>Uvanlige klausuler</h2>
					{parsedResult.unusual_clauses.map((clause: string, index: number) => {
						return (
							<div className='my-4' key={`${index}unusual`}>
								<h3 className='font-semibold flex items-center'>
									<Info className='h-5 w-5 text-blue-500 mr-2' />
									Uvanlig klausul {index + 1}
								</h3>
								<p>{clause}</p>
								<Badge variant='outline' className='text-blue-500 border-blue-500'>
									Seksjon 5
								</Badge>
							</div>
							// <div key={index} className='bg-blue-200 p-2 my-2 rounded-lg'>
							//     <p>{clause}</p>
							// </div>
						);
					})}
					{/* <MarkdownRenderer markdown={result.data?.content[0].text.value} /> */}
				</div>
			)}
		</div>
	);
}
