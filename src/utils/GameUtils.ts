import { EntityType, IEntity } from "../components/Entity";

const ENTITY_WIDTH_CQI = 5;

const RPS_STATS = {
	rock: "scissors",
	paper: "rock",
	scissors: "paper",
};

function getRandomInt(min: number, max: number) {
	const str = (Math.random() * (max - min) + min).toFixed(3);
	return parseFloat(str);
}

function getRandomCoordinate(max: number) {
	const maxPossible = max - ENTITY_WIDTH_CQI;
	let coordinate = getRandomInt(0, max);
	if (coordinate > maxPossible) {
		coordinate = maxPossible;
	}
	return coordinate;
}

function getNewType(type1: EntityType, type2: EntityType): EntityType {
	return RPS_STATS[type1] === type2
		? type1
		: RPS_STATS[type2] === type1
		? type2
		: type1;
}

function getMovedEntityCoordinate(
	currentPos: number,
	maxDistance: number,
	limit: number
): number {
	const posNewMinLimit = currentPos - maxDistance;
	const posNewMaxLimit = currentPos + maxDistance;
	const posRandom = getRandomInt(posNewMinLimit, posNewMaxLimit);
	return posRandom < 0 ? 0 : posRandom > limit ? limit : posRandom;
}

function shuffleEntityPositions(
	array: IEntity[],
	maxMovingDistance: number
): void {
	const height = 100;
	const width = 100;
	for (let i = 0; i < array.length; i++) {
		const entity = array[i];
		entity.x = getMovedEntityCoordinate(
			entity.x,
			maxMovingDistance,
			width - ENTITY_WIDTH_CQI
		);
		entity.y = getMovedEntityCoordinate(
			entity.y,
			maxMovingDistance,
			height - ENTITY_WIDTH_CQI
		);
	}
}

function isIntersection(entity1: IEntity, entity2: IEntity): boolean {
	const X1 = entity1.x;
	const X2 = entity2.x;
	const Y1 = entity1.y;
	const Y2 = entity2.y;
	const W1 = ENTITY_WIDTH_CQI;
	const W2 = ENTITY_WIDTH_CQI;
	const H1 = ENTITY_WIDTH_CQI;
	const H2 = ENTITY_WIDTH_CQI;

	return !(X1 + W1 < X2 || X2 + W2 < X1 || Y1 + H1 < Y2 || Y2 + H2 < Y1);
}

function applyEntityInterceptions(array: IEntity[]): void {
	for (let i = 0; i < array.length; i++) {
		const entity1 = array[i];
		for (let j = 0; j < array.length; j++) {
			if (j === i) continue;
			const entity2 = array[j];
			if (isIntersection(entity1, entity2)) {
				const newType = getNewType(entity1.type, entity2.type);
				entity1.type = newType;
				entity2.type = newType;
			}
		}
	}
}

function buildEntitiesByType(type: EntityType, count: number): IEntity[] {
	return [...new Array(count)].map(() => ({
		type: type,
		x: getRandomCoordinate(100),
		y: getRandomCoordinate(100),
	}));
}

function isGameFinished(entities: IEntity[]) {
	return (
		entities.length === 0 || entities.every((e) => e.type === entities[0].type)
	);
}

export {
	getRandomInt,
	getRandomCoordinate,
	getNewType,
	getMovedEntityCoordinate,
	shuffleEntityPositions,
	isIntersection,
	applyEntityInterceptions,
	buildEntitiesByType,
	isGameFinished,
	ENTITY_WIDTH_CQI,
	RPS_STATS,
};
