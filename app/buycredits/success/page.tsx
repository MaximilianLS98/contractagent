import Link from 'next/link';
import type { Stripe } from 'stripe';

// import PrintObject from '@/components/PrintObject';
import { stripe } from '@/lib/stripe';

// export default async function Page() {
//     return (
//         <div className="container mx-auto mt-8">
//             <h1 className="text-5xl font-semibold mb-4">Du har kjøpt tokens!</h1>
//             <p>Vi har mottatt din betaling og du kan nå analysere flere dokumenter.</p>
//             {/* Link to the analyse page /livedemo */}
//             <Link href="/livedemo">
//                 <a className="text-blue-500 hover:underline">Gå til analyse siden</a>
//             </Link>
//         </div>
//     )
// }

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ResultPage(props: {
  searchParams: SearchParams
}) {
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

	return (
		<>
			<h2>Status: {paymentIntent.status}</h2>
			<h3>Checkout Session response:</h3>
			<pre>{JSON.stringify(checkoutSession, null, 4)}</pre>
		</>
	);
}
