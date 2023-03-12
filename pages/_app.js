import { Fragment } from 'react';

import Head from 'next/head';

import Footer from '@/components/footer/Footer';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Component {...pageProps} />
			<Footer />
		</Fragment>
	);
}
