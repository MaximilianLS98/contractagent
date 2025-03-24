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
                            Denne kontraktanalysetjenesten er et <strong>demonstrasjonsverktøy</strong> og er{' '}
                            <strong>ikke ment for bruk i virkelige situasjoner</strong>.
                        </p>
                        <ul className='mt-2 list-disc list-inside text-sm'>
                            <li>
                                Ikke last opp sensitive, konfidensielle eller juridisk bindende dokumenter.
                            </li>
                            <li>Analysen er automatisert og kan inneholde unøyaktigheter.</li>
                            <li>
                                Denne tjenesten <strong>erstatter ikke</strong> profesjonell juridisk rådgivning.
                            </li>
                            <li>
                                Leverandøren påtar seg <strong>intet ansvar</strong> for bruk av dette verktøyet.
                            </li>
                        </ul>
                        <div className='mt-4 flex items-center space-x-2'>
                            <Checkbox id='agree' checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)} />
                            <label htmlFor='agree' className='text-sm'>
                                Jeg forstår og aksepterer disse vilkårene.
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
