import { useEffect, useMemo, useState } from "react";
import styles from "./../assets/scss/Board.module.scss";
import Entity, { IEntity } from "./Entity";
import {
	applyEntityInterceptions,
	buildEntitiesByType,
	isGameFinished,
	shuffleEntityPositions,
} from "../utils/GameUtils";
import { Button, Card } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

export type BoardProps = {
	maxMovingDistance?: number;
	interval?: number;
	rockCount: number;
	scissorsCount: number;
	paperCount: number;
};

export default function Board(props: BoardProps) {
	const {
		rockCount,
		scissorsCount,
		paperCount,
		interval = 10,
		maxMovingDistance = 1,
	} = props;

	const [isFinished, setIsFinished] = useState(false);
	const [isRunning, setIsRunning] = useState(false);
	const initialEntities = useMemo(() => buildEntities(), []);
	const [entities, setEntities] = useState(initialEntities);

	function buildEntities(): IEntity[] {
		return [
			...buildEntitiesByType("rock", rockCount),
			...buildEntitiesByType("scissors", scissorsCount),
			...buildEntitiesByType("paper", paperCount),
		];
	}

	function renderGame() {
		const entitiesCopy = [...entities];
		shuffleEntityPositions(entitiesCopy, maxMovingDistance);
		applyEntityInterceptions(entitiesCopy);
		setEntities(entitiesCopy);
	}

	useEffect(() => {
		if (isRunning) {
			const intervalId = setInterval(() => renderGame(), interval);
			return () => clearInterval(intervalId);
		}
	}, [isRunning]);

	function onRunningToggle() {
		setIsRunning((isRunning) => !isRunning);
	}

	function onShuffleClick() {
		setIsFinished(false);
		setIsRunning(false);
		setEntities(buildEntities());
	}

	useEffect(() => {
		const isFinishedNew = isGameFinished(entities);
		if (isFinishedNew) {
			setIsRunning(false);
			setIsFinished(true);
		}
	}, [entities]);

	return (
		<div className={styles["board-container"]}>
			<Card sx={{ padding: "1rem", display: "flex", gap: 2 }}>
				<Button
					disabled={isFinished}
					variant="contained"
					color={isRunning ? "warning" : "success"}
					startIcon={<PlayArrowIcon />}
					onClick={onRunningToggle}
				>
					{isRunning ? "Pause" : "Start"}
				</Button>
				<Button
					variant="text"
					color="primary"
					startIcon={<ReplayIcon />}
					onClick={onShuffleClick}
				>
					Shuffle
				</Button>
			</Card>
			<div className={styles["board"]}>
				{entities.map((entity, index) => (
					<Entity key={index} {...entity} />
				))}
			</div>
		</div>
	);
}
