import styles from "./../assets/scss/Entity.module.scss";

export type EntityType = "rock" | "paper" | "scissors";

export type EntityProps = {
	type: EntityType;
	x: number;
	y: number;
};

export type IEntity = {
	type: EntityType;
	x: number;
	y: number;
};

export default function Entity(props: EntityProps) {
	const { x, y, type } = props;

	const style: React.CSSProperties = {
		top: `${x}cqi`,
		left: `${y}cqi`,
	};

	return (
		<div style={style} data-type={type} className={styles["entity"]}></div>
	);
}
