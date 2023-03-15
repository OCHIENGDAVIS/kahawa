import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { StoreContext } from '@/state/store.context';

import { getAllStores, getStoreById } from '@/data/coffeee-mock';
import { getOneStore, getStores } from '@/lib/coffee-store';
import { isEmpty } from '@/helpers';

export default function CoffeeStoreIndexPage({ store }) {
	const { isFallback, query } = useRouter();
	if (isFallback) {
		return <div>Loading... </div>;
	}
	const { state } = useContext(StoreContext);
	const { coffeeStores } = state;
	const [coffeeStore, setCoffeeStore] = useState(store);

	const { location } = coffeeStore;
	const { storeId } = query;

	useEffect(() => {
		if (isEmpty(store)) {
			if (coffeeStores.length > 0) {
				const storeFromState = coffeeStores.find(
					(store) => store.fsq_id === storeId
				);
				setCoffeeStore(storeFromState);
			}
		}
	}, [storeId]);

	return (
		<div>
			<Link href="/"> Back to home</Link>
			<h1>{coffeeStore.name}</h1>
			<Image
				src={
					coffeeStore.images[1] ||
					'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
				}
				alt={coffeeStore.name}
				width={600}
				height={400}
			/>
			<p>{location.country}</p>
			<p>{location.locality}</p>
			<p>{location.address}</p>
		</div>
	);
}

export async function getStaticProps(context) {
	const { params } = context;
	const { storeId } = params;
	const store = await getOneStore(storeId);
	if (!store) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			store,
			revalidate: 1800,
		},
	};
}

export async function getStaticPaths() {
	const stores = await getStores();
	const paths = stores.map((store) => ({
		params: { storeId: String(store.id) },
	}));
	return {
		paths,
		fallback: true,
	};
}
