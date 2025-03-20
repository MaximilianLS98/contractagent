'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface StripeCheckoutButtonProps {
	tokenCount: number;
	totalAmount: number;
}

export default function StripeCheckoutButton({
	tokenCount,
	totalAmount,
}: StripeCheckoutButtonProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckout = async () => {
		setIsLoading(true);

		try {
			// In a real implementation, this would call your API to create a Stripe checkout session
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tokenCount }),
			});

			const data = await response.json();

			if (data.success) {
				// In a real implementation, this would redirect to Stripe's checkout page
				// window.location.href = data.checkoutUrl;

				// For demo purposes, we'll simulate the redirect
				setTimeout(() => {
					router.push(data.checkoutUrl);
				}, 1500);
			} else {
				console.error('Failed to create checkout session');
				setIsLoading(false);
			}
		} catch (error) {
			console.error('Error during checkout:', error);
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={handleCheckout}
			className='w-full bg-blue-600 hover:bg-blue-700 h-12 text-base'
			disabled={isLoading}>
			{isLoading ? (
				<>
					<Loader2 className='mr-2 h-5 w-5 animate-spin' />
					Redirecting to Stripe...
				</>
			) : (
				<>Checkout with Stripe • {totalAmount.toFixed(2)} NOK</>
			)}
		</Button>
	);
}
