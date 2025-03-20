'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentFormProps {
	onSubmit: (e: React.FormEvent) => void;
	isProcessing: boolean;
	totalAmount: number;
}

export default function PaymentForm({ onSubmit, isProcessing, totalAmount }: PaymentFormProps) {
	return (
		<div className='space-y-6'>
			<div className='rounded-lg border p-4 bg-gray-50'>
				<p className='text-sm text-gray-500 mb-2'>
					You'll be redirected to Stripe's secure checkout page to complete your purchase.
				</p>
				<ul className='text-sm space-y-2'>
					<li className='flex items-center gap-2'>
						<svg
							className='h-4 w-4 text-green-500'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
						Secure payment processing
					</li>
					<li className='flex items-center gap-2'>
						<svg
							className='h-4 w-4 text-green-500'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
						No account required
					</li>
					<li className='flex items-center gap-2'>
						<svg
							className='h-4 w-4 text-green-500'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
						Support for all major payment methods
					</li>
				</ul>
			</div>

			<form onSubmit={onSubmit}>
				<Button
					type='submit'
					className='w-full bg-blue-600 hover:bg-blue-700 h-12 text-base'
					disabled={isProcessing}>
					{isProcessing ? (
						<>
							<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							Redirecting to Stripe...
						</>
					) : (
						<>Checkout with Stripe • {totalAmount.toFixed(2)} NOK</>
					)}
				</Button>
			</form>
		</div>
	);
}
