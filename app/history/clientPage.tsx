'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
	FileText,
	ChevronDown,
	ChevronUp,
	AlertTriangle,
	Lightbulb,
	FileSearch,
	Calendar,
	Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DocumentDetails from './document-details';
import Link from 'next/link';

export default function HistoryPage({ documentsLive }: { documentsLive: any[] }) {
	const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
	const [documents, setDocuments] = useState<any[]>(documentsLive);

	const toggleExpand = (docId: string) => {
		console.log('docId', docId);
		setExpandedDocId(expandedDocId === docId ? null : docId);
	};

	const formatDate = (dateString: string) => {
		try {
			return format(new Date(dateString), 'dd MMM yyyy');
		} catch (e) {
			return 'Invalid date';
		}
	};

	const formatTime = (dateString: string) => {
		try {
			return format(new Date(dateString), 'HH:mm');
		} catch (e) {
			return '';
		}
	};

	return (
		<div className='container mx-auto py-8 px-4 md:px-6'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Document History</h1>
					<p className='text-muted-foreground mt-1'>
						View and manage your previously analyzed legal documents
					</p>
				</div>
				<div className='mt-4 md:mt-0'>
                    <Link href="/livedemo">
					<Button className='flex items-center gap-2'>
						<FileSearch className='h-4 w-4' />
						Analyze New Document
					</Button>
                    </Link>
				</div>
			</div>

			<Card className='mb-8'>
				<CardHeader className='pb-3'>
					<CardTitle>Analysis Summary</CardTitle>
					<CardDescription>
						You have analyzed {documents.length} documents
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='flex items-center gap-3 col-span-3'>
                                <div className='bg-blue-100 p-3 rounded-full'>
                                    <FileText className='h-5 w-5 text-blue-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Total Documents</p>
								<p className='text-2xl font-semibold'>{documents.length}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='bg-amber-100 p-3 rounded-full'>
								<AlertTriangle className='h-5 w-5 text-amber-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Critical Issues</p>
								<p className='text-2xl font-semibold'>{documents.reduce((acc, doc) => acc + (JSON.parse(JSON.parse(doc.result).content[0].text.value).critical_clauses?.length || 0), 0)}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='bg-green-100 p-3 rounded-full'>
								<Lightbulb className='h-5 w-5 text-green-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Suggestions</p>
								<p className='text-2xl font-semibold'>{documents.reduce((acc, doc) => acc + (JSON.parse(JSON.parse(doc.result).content[0].text.value).suggestions?.length || 0), 0)}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='bg-blue-100 p-3 rounded-full'>
								<FileSearch className='h-5 w-5 text-blue-600' />
							</div>
							<div>
								<p className='text-sm text-muted-foreground'>Unusual Clauses</p>
								<p className='text-2xl font-semibold'>{documents.reduce((acc, doc) => acc + (JSON.parse(JSON.parse(doc.result).content[0].text.value).unusual_clauses?.length || 0), 0)}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='space-y-4'>
				{documents.map((doc) => {
					const result = JSON.parse(doc.result);
					const isExpanded = expandedDocId === doc.$id;
					// const parsedResult = JSON.parse(doc.result);
					const aiMessage = JSON.parse(doc.result);
                    const parsedResult = JSON.parse(aiMessage.content[0].text.value)

					return (
						<Card key={doc.$id} className='overflow-hidden'>
							<div
								className='p-6 cursor-pointer hover:bg-slate-50 transition-colors'
								onClick={() => toggleExpand(doc.$id)}>
								<div className='flex justify-between items-start'>
									<div className='flex items-start gap-4'>
										<div className='bg-slate-100 p-3 rounded'>
											<FileText className='h-6 w-6 text-slate-600' />
										</div>
										<div>
											<h3 className='font-medium text-lg'>{doc.filename}</h3>
											<div className='flex flex-wrap gap-2 mt-2'>
												<Badge variant='outline' className='bg-slate-100'>
													{parsedResult.contract_type}
												</Badge>
												<div className='flex items-center text-sm text-muted-foreground gap-1'>
													<Calendar className='h-3.5 w-3.5' />
													<span>{formatDate(doc.$createdAt)}</span>
												</div>
												<div className='flex items-center text-sm text-muted-foreground gap-1'>
													<Clock className='h-3.5 w-3.5' />
													<span>{formatTime(doc.$createdAt)}</span>
												</div>
											</div>
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<Badge
											variant='secondary'
											className='bg-amber-100 text-amber-800 hover:bg-amber-200'>
											{result.critical_clauses?.length} Issues
										</Badge>
										{isExpanded ? (
											<ChevronUp className='h-5 w-5 text-slate-400' />
										) : (
											<ChevronDown className='h-5 w-5 text-slate-400' />
										)}
									</div>
								</div>
							</div>

							{isExpanded && (
								<>
									<Separator />
									<DocumentDetails document={doc} result={parsedResult} />
								</>
							)}
						</Card>
					);
				})}
			</div>
		</div>
	);
}
