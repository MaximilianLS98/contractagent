'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import TokenSelector from '@/components/stripe/shadcn/token-selector';
import StripeCheckoutButton from '@/components/stripe/shadcn/stripe-checkout-button';

export default function PaymentPage() {
	const router = useRouter();
	const [tokenCount, setTokenCount] = useState(100);
	const [isProcessing, setIsProcessing] = useState(false);

	const getDiscountedPrice = (count: number) => {
		let pricePerToken = 2; // Base price

		if (count >= 1000) {
			pricePerToken = 2 * 0.85; // 15% discount
		} else if (count >= 500) {
			pricePerToken = 2 * 0.9; // 10% discount
		} else if (count >= 100) {
			pricePerToken = 2 * 0.95; // 5% discount
		}

		return count * pricePerToken;
	};

    // ! Not in use - we handle checkout in the StripeCheckoutButton component
	const handlePayment = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		// In a real implementation, we would:
		// 1. Call your backend to create a Stripe Checkout Session
		// 2. Redirect to Stripe's hosted checkout page

		// Simulate redirecting to Stripe and then coming back
		setTimeout(() => {
			router.push('/payment/success?tokens=' + tokenCount);
		}, 1500);
	};

	const totalPrice = getDiscountedPrice(tokenCount);

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container py-8'>
				<Link
					href='/'
					className='inline-flex items-center text-sm font-medium text-blue-600 mb-6 hover:underline'>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Hjem
				</Link>

				<div className='grid gap-8 md:grid-cols-2'>
					<div>
						<h1 className='text-3xl font-bold mb-6'>Kjøp Tokens</h1>
						<TokenSelector
							tokenCount={tokenCount}
							setTokenCount={setTokenCount}
							pricePerToken={2}
							currency='NOK'
						/>

						<Card className='mt-8'>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex justify-between'>
									<span className='text-gray-500'>
										{tokenCount} Tokens (2 NOK each)
									</span>
									<span>{tokenCount * 2} NOK</span>
								</div>

								{tokenCount >= 100 && (
									<div className='flex justify-between text-green-600'>
										<span>
											Volume Discount
											{tokenCount >= 1000
												? ' (15%)'
												: tokenCount >= 500
												? ' (10%)'
												: ' (5%)'}
										</span>
										<span>-{(tokenCount * 2 - totalPrice).toFixed(2)} NOK</span>
									</div>
								)}

								<div className='flex justify-between border-t pt-4'>
									<span className='font-medium'>Total</span>
									<span className='font-bold text-blue-600'>
										{totalPrice.toFixed(2)} NOK
									</span>
								</div>
							</CardContent>
						</Card>

						<div className='mt-6 flex items-center gap-2 text-sm text-gray-500'>
							<Shield className='h-4 w-4' />
							<span>Secure payment processing</span>
						</div>
					</div>

					<div>
						<Card>
							<CardHeader>
								<CardTitle>Complete Your Purchase</CardTitle>
								<CardDescription>
									You'll be redirected to Stripe's secure checkout page
								</CardDescription>
							</CardHeader>
							<CardContent>
								<StripeCheckoutButton
									tokenCount={tokenCount}
									totalAmount={totalPrice}
								/>
							</CardContent>
							<CardFooter className='flex flex-col gap-4 border-t pt-6'>
								<div className='flex items-center justify-center gap-2'>
									<div className='flex gap-2'>
										{/* <img
											src='/placeholder.svg?height=20&width=32'
											alt='Visa'
											className='h-5'
										/>
										<img
											src='/placeholder.svg?height=20&width=32'
											alt='Mastercard'
											className='h-5'
										/>
										<img
											src='/placeholder.svg?height=20&width=32'
											alt='Amex'
											className='h-5'
										/> */}
									</div>
									<span className='text-sm text-gray-500'>
										and more payment methods
									</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
