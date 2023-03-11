import { Fragment } from 'react';

import Head from 'next/head';

import Footer from '@/components/footer/Footer';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />
			<Footer />
		</Fragment>
	);
}
