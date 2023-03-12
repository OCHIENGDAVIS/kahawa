import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getStoreById, getAllStores } from '@/data/coffeee';

export default function CoffeeStoreIndexPage({ store }) {
	const { isFallback } = useRouter();
	if (isFallback) {
		return <div>Loading... </div>;
	}

	return (
		<div>
			<Link href="/"> Back to home</Link>
			<h1>{store.name}</h1>
			<Image
				src={store.imgUrl}
				alt={store.name}
				width={600}
				height={400}
			/>
			<p>{store.neighbourhood}</p>
			<p>{store.address}</p>
		</div>
	);
}

export function getStaticProps(context) {
	const { params } = context;
	const { storeId } = params;
	const store = getStoreById(storeId);
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

export function getStaticPaths() {
	const stores = getAllStores();
	const paths = stores.map((store) => ({
		params: { storeId: String(store.id) },
	}));
	return {
		paths,
		fallback: true,
	};
}
