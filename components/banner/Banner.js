import classes from './Banner.module.scss';

export default function Banner(props) {
	return (
		<div className={classes.banner}>
			<h1 className={classes.title}>
				<span className={classes.title1}>Kahawa </span>
				<span className={classes.title2}>Epicurean </span>
			</h1>

			<p className={classes.subtext}>Discover your local coffee shops!</p>
			<button className={classes.btn} onClick={props.btnHandler}>
				{props.btnText}
			</button>
		</div>
	);
}
