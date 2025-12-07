import { AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface DocumentDetailsProps {
	document: any;
	result: {
		contract_type: string;
		critical_clauses: string[];
		suggestions: string[];
		unusual_clauses: string[];
	};
}

export default function DocumentDetails({ document, result }: DocumentDetailsProps) {
	return (
		<div className='p-6'>
			<Tabs defaultValue='analysis'>
				<TabsList className='mb-4'>
					<TabsTrigger value='analysis'>Analysis</TabsTrigger>
					<TabsTrigger value='document'>Document</TabsTrigger>
				</TabsList>

				<TabsContent value='analysis' className='space-y-6'>
					<div>
						<h4 className='text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2'>
							<AlertTriangle className='h-4 w-4 text-amber-500' />
							Critical Clauses
						</h4>
						<div className='space-y-3'>
							{result.critical_clauses?.map((clause, index) => (
								<div
									key={index}
									className='bg-amber-50 border border-amber-200 rounded-md p-4'>
									<p className='text-sm text-amber-800'>{clause}</p>
								</div>
							))}
						</div>
					</div>

					<Separator />

					<div>
						<h4 className='text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2'>
							<Lightbulb className='h-4 w-4 text-green-500' />
							Suggestions
						</h4>
						<div className='space-y-3'>
							{result.suggestions?.map((suggestion, index) => (
								<div
									key={index}
									className='bg-green-50 border border-green-200 rounded-md p-4'>
									<p className='text-sm text-green-800'>{suggestion}</p>
								</div>
							))}
						</div>
					</div>

					<Separator />

					<div>
						<h4 className='text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2'>
							<AlertCircle className='h-4 w-4 text-blue-500' />
							Unusual Clauses
						</h4>
						<div className='space-y-3'>
							{result.unusual_clauses?.map((clause, index) => (
								<div
									key={index}
									className='bg-blue-50 border border-blue-200 rounded-md p-4'>
									<p className='text-sm text-blue-800'>{clause}</p>
								</div>
							))}
						</div>
					</div>
				</TabsContent>

				<TabsContent value='document'>
					<div className='bg-slate-50 p-4 rounded-md'>
						<p className='text-sm text-muted-foreground mb-4'>
							Document content is not available in this view. Please download the
							document to view its contents.
						</p>
						<Button variant='outline' size='sm'>
							Download Original Document
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
