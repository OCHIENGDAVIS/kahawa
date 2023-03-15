import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<Link href="/">back to stores</Link>
			<h1>OOPS! Page Not FOund</h1>
		</div>
	);
}
