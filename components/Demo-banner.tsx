'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export function DemoBanner() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const bannerDismissed = localStorage.getItem('demoBannerDismissed');
		if (bannerDismissed) {
			setIsVisible(false);
		}
	}, []);

	const dismissBanner = () => {
		setIsVisible(false);
		localStorage.setItem('demoBannerDismissed', 'true');
	};

	if (!isVisible) return null;

	return (
		<Alert className='rounded-none border-b'>
			<AlertDescription className='flex items-center justify-between'>
				<span>
					<strong>Demo Prosjekt:</strong> Dette er en demonstrasjon og kan ikke brukes til
					juridiske formål eller i produksjon.
				</span>
				<Button variant='destructiveOutline' size='sm' className='ml-2' onClick={dismissBanner}>
					<X className='h-4 w-4' />
					<span className='sr-only'>Lukk</span>
				</Button>
			</AlertDescription>
		</Alert>
	);
}
