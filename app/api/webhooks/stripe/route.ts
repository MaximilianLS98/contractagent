import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type { Stripe } from 'stripe';
import { headers } from "next/headers";
import { NOKPERTOKEN } from "@/config";
// import { addTokens } from "@/app/actions/tokens";
import { addTokens } from "@/utils/tokens";
import PostHogClient from "@/posthog";

export async function POST(req: NextRequest) {
    console.log(`Webhook received in /webhooks/stripe`);
	const body = await req.text();
	const sig = (await headers()).get('Stripe-Signature') as string;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        const event = stripe.webhooks.constructEvent(body, sig, webhookSecret) as ConstructedEvent;
        console.log(`Webhook constructed event: ${JSON.stringify(event)}`);
        const data = event.data.object;
        const amountPaid = data.amount_total / 100;
        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve( data.id,
			{
				expand: ['line_items', 'payment_intent'],
			},
		);

        const lineItemName = checkoutSession.line_items?.data[0].description; // in the form of "Tokens 1000" for example, we need to extract the number
        if (!lineItemName) {
            throw new Error('No line items found');
        }
        const tokensBought = parseInt(lineItemName.split(' ')[1]); // get the number of tokens bought

        await addTokens(data.client_reference_id, tokensBought);

        const posthog = PostHogClient();
        posthog.capture({
            distinctId: data.client_reference_id,
            event: 'purchase',
            properties: {
                amount: amountPaid,
                tokensBought,
                id: data.id,
            },
        });
        posthog.shutdown();

    } catch (err) {
        console.error(`Webhook Error: ${err}`);
		return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    
    return NextResponse.json({ message: "Hello World" });
}

type ConstructedEvent = {
    id: string;
    object: string;
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            object: string;
            adaptive_pricing: { enabled: boolean };
            after_expiration: null;
            allow_promotion_codes: null;
            amount_subtotal: number;
            amount_total: number;
            automatic_tax: { enabled: boolean; liability: null; status: null };
            billing_address_collection: null;
            cancel_url: string;
            client_reference_id: string;
            client_secret: null;
            collected_information: null;
            consent: null;
            consent_collection: null;
            created: number;
            currency: string;
            currency_conversion: null;
            custom_fields: [];
            custom_text: {
                after_submit: null;
                shipping_address: null;
                submit: null;
                terms_of_service_acceptance: null;
            };
            customer: null;
            customer_creation: string;
            customer_details: {
                address: {
                    city: null;
                    country: string;
                    line1: null;
                    line2: null;
                    postal_code: null;
                    state: null;
                };
                email: string;
                name: string;
                phone: null;
                tax_exempt: string;
                tax_ids: [];
            };
            customer_email: null;
            discounts: [];
            expires_at: number;
            invoice: null;
            invoice_creation: {
                enabled: boolean;
                invoice_data: {
                    account_tax_ids: null;
                    custom_fields: null;
                    description: null;
                    footer: null;
                    issuer: null;
                    metadata: {};
                    rendering_options: null;
                };
            };
            livemode: boolean;
            locale: null;
            metadata: {};
            mode: string;
            payment_intent: string;
            payment_link: null;
            payment_method_collection: string;
            payment_method_configuration_details: {
                id: string;
                parent: null;
            };
            payment_method_options: { card: { request_three_d_secure: string } };
            payment_method_types: string[];
            payment_status: string;
            phone_number_collection: { enabled: boolean };
            recovered_from: null;
            saved_payment_method_options: null;
            setup_intent: null;
            shipping_address_collection: null;
            shipping_cost: null;
            shipping_details: null;
            shipping_options: [];
            status: string;
            submit_type: string;
            subscription: null;
            success_url: string;
            total_details: { amount_discount: number; amount_shipping: number; amount_tax: number };
            ui_mode: string;
            url: null;
        };
    };
    livemode: boolean;
    pending_webhooks: number;
    request: { id: null; idempotency_key: null };
    type: string;
};


const exampleConstructedEvent = {
	id: 'evt_1R4UA2GqBeLm4TyPRwfw2s6J',
	object: 'event',
	api_version: '2025-02-24.acacia',
	created: 1742419706,
	data: {
		object: {
			id: 'cs_test_a1to5qCIhHgKRICVBgZWV6LXUPDjVKph6s9nWfn6G4UGztUtFihSKuDmbO',
			object: 'checkout.session',
			adaptive_pricing: { enabled: false },
			after_expiration: null,
			allow_promotion_codes: null,
			amount_subtotal: 36000,
			amount_total: 36000,
			automatic_tax: { enabled: false, liability: null, status: null },
			billing_address_collection: null,
			cancel_url: 'http://localhost:3000/buycredits',
			client_reference_id: null,
			client_secret: null,
			collected_information: null,
			consent: null,
			consent_collection: null,
			created: 1742419683,
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
				email: 'maxi@ways.no',
				name: 'Maximilian Lunde Skjønhaug',
				phone: null,
				tax_exempt: 'none',
				tax_ids: [],
			},
			customer_email: null,
			discounts: [],
			expires_at: 1742506083,
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
			livemode: false,
			locale: null,
			metadata: {},
			mode: 'payment',
			payment_intent: 'pi_3R4UA0GqBeLm4TyP0OslKGsr',
			payment_link: null,
			payment_method_collection: 'if_required',
			payment_method_configuration_details: {
				id: 'pmc_1R42vfGqBeLm4TyPNoDEMIq1',
				parent: null,
			},
			payment_method_options: { card: { request_three_d_secure: 'automatic' } },
			payment_method_types: ['card', 'klarna', 'link'],
			payment_status: 'paid',
			phone_number_collection: { enabled: false },
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
				'http://localhost:3000/buycredits/success?session_id={CHECKOUT_SESSION_ID}',
			total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
			ui_mode: 'hosted',
			url: null,
		},
	},
	livemode: false,
	pending_webhooks: 3,
	request: { id: null, idempotency_key: null },
	type: 'checkout.session.completed',
};

const examplePayload = {
	object: {
		id: 'cs_test_a11uElqjQyJ2o0kvHqgFvtNPjBYFhPYDTeixSIAWiz5EffmxFVobvuInbd',
		object: 'checkout.session',
		adaptive_pricing: {
			enabled: false,
		},
		after_expiration: null,
		allow_promotion_codes: null,
		amount_subtotal: 24000,
		amount_total: 24000,
		automatic_tax: {
			enabled: false,
			liability: null,
			status: null,
		},
		billing_address_collection: null,
		cancel_url: 'http://localhost:3000/buycredits',
		client_reference_id: null,
		client_secret: null,
		collected_information: null,
		consent: null,
		consent_collection: null,
		created: 1742381743,
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
			email: 'maxi@ways.no',
			name: 'Maximilian Lunde Skjønhaug',
			phone: null,
			tax_exempt: 'none',
			tax_ids: [],
		},
		customer_email: null,
		discounts: [],
		expires_at: 1742468143,
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
		livemode: false,
		locale: null,
		metadata: {},
		mode: 'payment',
		payment_intent: 'pi_3R4KI1GqBeLm4TyP111PSpl5',
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
		success_url: 'http://localhost:3000/buycredits/success?session_id={CHECKOUT_SESSION_ID}',
		total_details: {
			amount_discount: 0,
			amount_shipping: 0,
			amount_tax: 0,
		},
		ui_mode: 'hosted',
		url: null,
	},
	previous_attributes: null,
};