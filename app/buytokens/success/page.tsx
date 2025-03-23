// 'use client';

// import { useSearchParams } from 'next/navigation';
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
import type { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ResultPage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams;

    if (!searchParams.session_id)
		throw new Error('Please provide a valid session_id (`cs_test_...`)');

	const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(
		typeof searchParams.session_id === 'string' ? searchParams.session_id : '',
		{
			expand: ['line_items', 'payment_intent'],
		},
	);

	const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
	// const searchParams = useSearchParams();
	// const tokens = searchParams.get('tokens') || '0';

	// const getOrderDetails = (tokenCount: number) => {
	// 	const basePrice =tokenCount * 2;
	// 	let discountRate = 0;
	// 	let finalPrice = basePrice;

	// 	if (tokenCount >= 1000) {
	// 		discountRate = 15;
	// 		finalPrice = basePrice * 0.85;
	// 	} else if (tokenCount >= 500) {
	// 		discountRate = 10;
	// 		finalPrice = basePrice * 0.9;
	// 	} else if (tokenCount >= 100) {
	// 		discountRate = 5;
	// 		finalPrice = basePrice * 0.95;
	// 	}

	// 	return {
	// 		basePrice,
	// 		discountRate,
	// 		discount: basePrice - finalPrice,
	// 		finalPrice,
	// 	};
	// };

	// const orderDetails = getOrderDetails(parseInt(tokens));

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
							<p className='text-3xl font-bold text-blue-600'>{((checkoutSession.amount_total ?? 0) / 2) / 100} Tokens</p>

							<div className='text-sm'>
								<p className='text-gray-500'>
									Base price: 2 NOK dummy
								</p>

								{/* {orderDetails.discountRate > 0 && (
									<p className='text-green-600'>
										Discount ({orderDetails.discountRate}%): -
										{orderDetails.discount.toFixed(2)} NOK
									</p>
								)} */}

								<p className='font-medium mt-1'>
									Total paid: {(checkoutSession.amount_total ?? 0) / 100} NOK
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

const exampleCheckoutSession = {
	id: 'cs_test_a17oMPDe5EchUKlHZXSTCTkyE2m05VmnvDXTM6b5EOideLAhNCekdI9aS6',
	object: 'checkout.session',
	adaptive_pricing: {
		enabled: false,
	},
	after_expiration: null,
	allow_promotion_codes: null,
	amount_subtotal: 170000,
	amount_total: 170000,
	automatic_tax: {
		enabled: false,
		liability: null,
		status: null,
	},
	billing_address_collection: null,
	cancel_url: 'https://legaledge.kaktusfamilien.com/buycredits',
	client_reference_id: 'user_2udIAvAiVixZcSfg9yArQlw3pSV',
	client_secret: null,
	collected_information: null,
	consent: null,
	consent_collection: null,
	created: 1742572875,
	currency: 'nok',
	currency_conversion: null,
	custom_fields: [],
	custom_text: {
		after_submit: null,
		shipping_address: null,
		submit: null,
		terms_of_service_acceptance: null,
	},
	customer: null,
	customer_creation: 'if_required',
	customer_details: {
		address: {
			city: null,
			country: 'NO',
			line1: null,
			line2: null,
			postal_code: null,
			state: null,
		},
		email: 'maximilian@kaktusfamilien.no',
		name: 'Maximilian Lunde Skjønhaug',
		phone: null,
		tax_exempt: 'none',
		tax_ids: [],
	},
	customer_email: null,
	discounts: [],
	expires_at: 1742659275,
	invoice: null,
	invoice_creation: {
		enabled: false,
		invoice_data: {
			account_tax_ids: null,
			custom_fields: null,
			description: null,
			footer: null,
			issuer: null,
			metadata: {},
			rendering_options: null,
		},
	},
	line_items: {
		object: 'list',
		data: [
			{
				id: 'li_1R580VGqBeLm4TyPxV11n5i8',
				object: 'item',
				amount_discount: 0,
				amount_subtotal: 170000,
				amount_tax: 0,
				amount_total: 170000,
				currency: 'nok',
				description: 'Custom token purchase',
				price: {
					id: 'price_1R580VGqBeLm4TyPz3EmMy3j',
					object: 'price',
					active: false,
					billing_scheme: 'per_unit',
					created: 1742572875,
					currency: 'nok',
					custom_unit_amount: null,
					livemode: false,
					lookup_key: null,
					metadata: {},
					nickname: null,
					product: 'prod_RyRS7UpNuZ8oMT',
					recurring: null,
					tax_behavior: 'unspecified',
					tiers_mode: null,
					transform_quantity: null,
					type: 'one_time',
					unit_amount: 170000,
					unit_amount_decimal: '170000',
				},
				quantity: 1,
			},
		],
		has_more: false,
		url: '/v1/checkout/sessions/cs_test_a17oMPDe5EchUKlHZXSTCTkyE2m05VmnvDXTM6b5EOideLAhNCekdI9aS6/line_items',
	},
	livemode: false,
	locale: null,
	metadata: {},
	mode: 'payment',
	payment_intent: {
		id: 'pi_3R580kGqBeLm4TyP0bnC7OzB',
		object: 'payment_intent',
		amount: 170000,
		amount_capturable: 0,
		amount_details: {
			tip: {},
		},
		amount_received: 170000,
		application: null,
		application_fee_amount: null,
		automatic_payment_methods: null,
		canceled_at: null,
		cancellation_reason: null,
		capture_method: 'automatic_async',
		client_secret: 'pi_3R580kGqBeLm4TyP0bnC7OzB_secret_e7Me03ODo7PlqYUMAEnQd6UxY',
		confirmation_method: 'automatic',
		created: 1742572890,
		currency: 'nok',
		customer: null,
		description: null,
		invoice: null,
		last_payment_error: null,
		latest_charge: 'ch_3R580kGqBeLm4TyP0KuGtpdo',
		livemode: false,
		metadata: {},
		next_action: null,
		on_behalf_of: null,
		payment_method: 'pm_1R580kGqBeLm4TyPIDlz47GK',
		payment_method_configuration_details: null,
		payment_method_options: {
			card: {
				installments: null,
				mandate_options: null,
				network: null,
				request_three_d_secure: 'automatic',
			},
		},
		payment_method_types: ['card'],
		processing: null,
		receipt_email: null,
		review: null,
		setup_future_usage: null,
		shipping: null,
		source: null,
		statement_descriptor: null,
		statement_descriptor_suffix: null,
		status: 'succeeded',
		transfer_data: null,
		transfer_group: null,
	},
	payment_link: null,
	payment_method_collection: 'if_required',
	payment_method_configuration_details: {
		id: 'pmc_1R42vfGqBeLm4TyPNoDEMIq1',
		parent: null,
	},
	payment_method_options: {
		card: {
			request_three_d_secure: 'automatic',
		},
	},
	payment_method_types: ['card', 'klarna', 'link'],
	payment_status: 'paid',
	permissions: null,
	phone_number_collection: {
		enabled: false,
	},
	recovered_from: null,
	saved_payment_method_options: null,
	setup_intent: null,
	shipping_address_collection: null,
	shipping_cost: null,
	shipping_details: null,
	shipping_options: [],
	status: 'complete',
	submit_type: 'pay',
	subscription: null,
	success_url:
		'https://legaledge.kaktusfamilien.com/buycredits/success?session_id={CHECKOUT_SESSION_ID}',
	total_details: {
		amount_discount: 0,
		amount_shipping: 0,
		amount_tax: 0,
	},
	ui_mode: 'hosted',
	url: null,
};