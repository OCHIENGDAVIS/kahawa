import Image from 'next/image';
import Link from 'next/link';

import classes from './Card.module.scss';

export default function Card(props) {
	return (
		<Link href={`/coffee-store/${props.id}`} className={classes.card}>
			<div>
				<h2>{props.name}</h2>
				<Image
					src={props.url}
					width={260}
					height={160}
					alt={props.name}
				/>
			</div>
		</Link>
	);
}
