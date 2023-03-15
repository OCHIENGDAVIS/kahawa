import { Fragment } from 'react';

import Head from 'next/head';

import Footer from '@/components/footer/Footer';
import StoreContextProvider from '@/state/store.context';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<StoreContextProvider>
				<Component {...pageProps} />
				<Footer />
			</StoreContextProvider>
		</Fragment>
	);
}
