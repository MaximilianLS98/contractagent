import { NextRequest, NextResponse } from "next/server";
import { setUpTokensForFirstTimeUser } from "@/app/actions/tokens";

// This endpoint recieves webhook events from Clerk on user signup, and should set up the tokens for the user in the appwrite database
export async function POST(req: NextRequest) {
	const body = await req.json();
    const clerk_user_id = body.data.id;

    // Add tokens to user
    setUpTokensForFirstTimeUser(clerk_user_id);

	return NextResponse.json({ message: "Tokens added" }, { status: 200 });

}

const examplePayload = {
	data: {
		birthday: '',
		created_at: 1654012591514,
		email_addresses: [
			{
				email_address: 'example@example.org',
				id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
				linked_to: [],
				object: 'email_address',
				verification: {
					status: 'verified',
					strategy: 'ticket',
				},
			},
		],
		external_accounts: [],
		external_id: '567772',
		first_name: 'Example',
		gender: '',
		id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
		image_url: 'https://img.clerk.com/xxxxxx',
		last_name: 'Example',
		last_sign_in_at: 1654012591514,
		object: 'user',
		password_enabled: true,
		phone_numbers: [],
		primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
		primary_phone_number_id: null,
		primary_web3_wallet_id: null,
		private_metadata: {},
		profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
		public_metadata: {},
		two_factor_enabled: false,
		unsafe_metadata: {},
		updated_at: 1654012591835,
		username: null,
		web3_wallets: [],
	},
	event_attributes: {
		http_request: {
			client_ip: '0.0.0.0',
			user_agent:
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
		},
	},
	object: 'event',
	timestamp: 1654012591835,
	type: 'user.created',
};