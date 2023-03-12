import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CoffeeStoreIndexPage() {
	const { query } = useRouter();
	const { storeId } = query;
	console.log(storeId);
	return (
		<div>
			Coffee Store with id {storeId}
			<Link href="/"> Back to home</Link>
		</div>
	);
}
