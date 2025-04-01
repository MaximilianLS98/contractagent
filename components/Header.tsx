import HeaderClient from './HeaderClient';
import { getTokens } from '@/app/actions/tokens';
import { auth } from '@clerk/nextjs/server';

const navItems = [
	{ href: '/', label: 'Hjem' },
	{ href: '/livedemo', label: 'Analyser' },
	{ href: '/upload', label: 'Demo' },
	{ href: '/contact', label: 'Kontakt' },
];

type Props = {
    userTokens?: number;
};

export default async function Header(props: Props) {

    const { userId } = await auth();

    const userTokens = await getTokens(userId!);

    // // useEffect for getting the userTokens
    // useEffect(() => {
    //     // Need to fetch it from /api/tokens
    //     fetch('/api/tokens', {
    //         method: 'GET',
    //         next: { tags: ['tokens']},
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setUserTokens(data.tokens);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }, []);


	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            {/* <pre>{JSON.stringify(userTokens)}</pre> */}
		    <HeaderClient userTokens={userTokens} />
		</header>
	);
}
