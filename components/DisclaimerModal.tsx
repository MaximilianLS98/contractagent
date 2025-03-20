'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface DisclaimerModalProps {
	onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
	const [open, setOpen] = useState(true);
	const [agreed, setAgreed] = useState(false);

	const handleAccept = () => {
		if (agreed) {
			setOpen(false);
			onAccept();
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
            onInteractOutside={(e) => e.preventDefault()} // Prevents the dialog from closing when clicking outside the dialog window
            >
				<DialogHeader>
					<DialogTitle>Disclaimer</DialogTitle>
					{/* <DialogDescription> */}
						<p>
							This contract analyzer is a <strong>demonstration tool</strong> and is{' '}
							<strong>not intended for real-world use</strong>.
						</p>
						<ul className='mt-2 list-disc list-inside text-sm'>
							<li>
								Do not upload sensitive, confidential, or legally binding documents.
							</li>
							<li>The analysis is automated and may contain inaccuracies.</li>
							<li>
								This tool does <strong>not</strong> replace professional legal
								advice.
							</li>
							<li>
								The provider assumes <strong>no liability</strong> for any use of
								this tool.
							</li>
						</ul>
						<div className='mt-4 flex items-center space-x-2'>
							<Checkbox id='agree' checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)} />
							<label htmlFor='agree' className='text-sm'>
								I understand and accept these terms.
							</label>
						</div>
					{/* </DialogDescription> */}
				</DialogHeader>
				<div className='flex justify-end gap-2'>
                    <Link href='/'>
					<Button variant='outline' onClick={() => setOpen(false)}>
						Kanseller
					</Button>
                    </Link>
					<Button onClick={handleAccept} disabled={!agreed}>
						Aksepter og fortsett
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
