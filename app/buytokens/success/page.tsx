'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
	const searchParams = useSearchParams();
	const tokens = searchParams.get('tokens') || '0';

	const getOrderDetails = (tokenCount: number) => {
		const basePrice =tokenCount * 2;
		let discountRate = 0;
		let finalPrice = basePrice;

		if (tokenCount >= 1000) {
			discountRate = 15;
			finalPrice = basePrice * 0.85;
		} else if (tokenCount >= 500) {
			discountRate = 10;
			finalPrice = basePrice * 0.9;
		} else if (tokenCount >= 100) {
			discountRate = 5;
			finalPrice = basePrice * 0.95;
		}

		return {
			basePrice,
			discountRate,
			discount: basePrice - finalPrice,
			finalPrice,
		};
	};

	const orderDetails = getOrderDetails(parseInt(tokens));

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
						<CheckCircle className='h-10 w-10 text-green-600' />
					</div>
					<CardTitle className='text-2xl'>Payment Successful!</CardTitle>
					<p className='text-sm text-gray-500 mt-2'>
						Payment processed securely via Stripe
					</p>
					<CardDescription>Thank you for your purchase</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='rounded-lg bg-blue-50 p-4'>
						<div className='text-center space-y-2'>
							<p className='text-sm text-gray-500'>You have purchased</p>
							<p className='text-3xl font-bold text-blue-600'>{tokens} Tokens</p>

							<div className='text-sm'>
								<p className='text-gray-500'>
									Base price: {orderDetails.basePrice.toFixed(2)} NOK
								</p>

								{orderDetails.discountRate > 0 && (
									<p className='text-green-600'>
										Discount ({orderDetails.discountRate}%): -
										{orderDetails.discount.toFixed(2)} NOK
									</p>
								)}

								<p className='font-medium mt-1'>
									Total paid: {orderDetails.finalPrice.toFixed(2)} NOK
								</p>
							</div>
						</div>
					</div>

					<div className='space-y-2'>
						<h3 className='text-sm font-medium'>Order Details</h3>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Order ID</span>
							<span>
								ORD-
								{Math.floor(Math.random() * 10000)
									.toString()
									.padStart(4, '0')}
							</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Date</span>
							<span>{new Date().toLocaleDateString()}</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span className='text-gray-500'>Payment Method</span>
							<span>Credit Card</span>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-4'>
					<Button asChild className='w-full bg-blue-600 hover:bg-blue-700'>
						<Link href='/dashboard'>
							Go to Dashboard <ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
					<Button variant='outline' asChild className='w-full'>
						<Link href='/'>Return to Home</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
