import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getAllStores, getStoreById } from '@/data/coffeee-mock';

export default function CoffeeStoreIndexPage({ store }) {
	const { isFallback } = useRouter();
	if (isFallback) {
		return <div>Loading... </div>;
	}
	const { location } = store;

	return (
		<div>
			<Link href="/"> Back to home</Link>
			<h1>{store.name}</h1>
			<Image
				src={
					store.images[1] ||
					'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
				}
				alt={store.name}
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
	const store = await getStoreById(storeId);
	if (!store) {
		return {
			notFound: true,
		};
	}
	console.log(store);
	return {
		props: {
			store,
			revalidate: 1800,
		},
	};
}

export async function getStaticPaths() {
	try {
		const stores = await getAllStores();
		const paths = stores.map((store) => ({
			params: { storeId: String(store.id) },
		}));
		return {
			paths,
			fallback: true,
		};
	} catch (error) {
		console.log(error);
		return {
			paths: [],
			fallback: false,
		};
	}
}
