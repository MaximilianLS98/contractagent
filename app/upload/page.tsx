'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, FileText } from 'lucide-react';

export default function UploadPage() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const router = useRouter();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		if (!file) return;

		setUploading(true);
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			setProgress(progress);
			if (progress >= 100) {
				clearInterval(interval);
				router.push('/feedback');
			}
		}, 500);
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<Card className='max-w-md mx-auto'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Last opp dokument</CardTitle>
					<CardDescription>
						Last opp ditt juridiske dokument for AI-analyse
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div className='grid w-full max-w-sm items-center gap-1.5'>
							<Label htmlFor='document'>Dokument</Label>
							<Input
								id='document'
								type='file'
								onChange={handleFileChange}
								accept='.pdf,.doc,.docx'
							/>
						</div>
						{file && (
							<div className='flex items-center space-x-2 text-sm text-muted-foreground'>
								<FileText size={16} />
								<span>{file.name}</span>
							</div>
						)}
						{uploading && (
							<div className='space-y-2'>
								<Progress value={progress} className='w-full' />
								<p className='text-sm text-muted-foreground'>
									Analyserer dokument... {progress}%
								</p>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleUpload} disabled={!file || uploading} className='w-full'>
						{uploading ? 'Analyserer...' : 'Start analyse'}
						{!uploading && <Upload className='ml-2 h-4 w-4' />}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
