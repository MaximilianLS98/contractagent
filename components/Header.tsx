'use client';

import HeaderClient from './HeaderClient';
import { useTokenCount } from '@/context/TokenContext';

export default function Header() {
    const { tokenCount } = useTokenCount();


	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            {/* <pre>{JSON.stringify(userTokens)}</pre> */}
		    <HeaderClient userTokens={tokenCount} />
		</header>
	);
}
