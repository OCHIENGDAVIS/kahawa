import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/banner/Banner';
import Card from '@/components/card/Card';

import { getAllStores } from '@/data/coffeee';

import classes from '@/styles/Home.module.scss';

export default function Home({ stores }) {
	function handleBtnClick() {
		console.log('banner button');
	}
	return (
		<>
			<Head>
				<title>Kahawa Epicurean</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={classes.home}>
				<div className={classes.container}>
					<Banner
						btnText="view stores nearby"
						btnHandler={handleBtnClick}
					/>
					<div className={classes.heroImage}>
						<Image
							src="/images/site/hero-image.png"
							alt="image of a women enjoying coffee"
							width={700}
							height={400}
						/>
					</div>
					{stores &&
						stores.map((store) => {
							return (
								<Card
									id={store.id}
									key={store.id}
									name={store.name}
									url={store.imgUrl}
									href={store.websiteUrl}
								/>
							);
						})}
				</div>
			</main>
		</>
	);
}

export function getStaticProps(context) {
	const stores = getAllStores();
	return {
		props: {
			stores,
		},
	};
}
