import React, { useMemo, useState } from 'react';
import { filter, get, map, random, sample } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
import ObstacleContext from '../contexts/obstacle-context';
import SpriteContext from '../contexts/sprite-context';
import SVG from './svg';
import { useInterval, useIsMounted } from '../lib/hooks';
import { getCollisions } from '../lib/utils/collision';
import { MOVEMENT_INCREMENT } from '../lib/constants';


function determineNextFrameIndex(frames, currentIndex) {
	if (currentIndex + 1 >= frames.length) return 0;
	return currentIndex + 1;
}


const FLIPPED_DIRECTIONS = {
	right: 'left',
	left: 'right',
	up: 'down',
	down: 'up',
};

const AXIS_DIRECTION = {
	x: {
		positive: 'right',
		negative: 'left',
	},
	y: {
		positive: 'up',
		negative: 'down',
	},
};

const DIRECTION_MULTIPLIERS = {
	left: -1,
	right: 1,
	up: -1,
	down: 1,
};

function getNumberDifference(a, b) {
	return a > b ? a - b : b - a;
}

function determineMovementDirection(previousCoordinates, newCoordinates) {
	const differenceX = getNumberDifference(previousCoordinates.x, newCoordinates.x);
	const differenceY = getNumberDifference(previousCoordinates.y, newCoordinates.y);
	const axis = differenceY > differenceX ? 'y' : 'x'
	const changeType = previousCoordinates[axis] < newCoordinates[axis] ? 'positive' : 'negative';
	return AXIS_DIRECTION[axis][changeType];
}

export default function NonPlayableCharacter(props) {
	const {
		frames,
		id,
		paths,
		collisionOffsets,
		defaultDirection,
		startingAction = 'default',
		startingDirection = 'down',
		startX = 0,
		startY = 0,
		movementInterval: _movementInterval,
	} = props;

	const [isRunning/*, setIsRunning*/] = useState(true);
	const [actionName/*, setActionName*/] = useState(startingAction);
	const [direction, setDirection] = useState(defaultDirection || startingDirection);
	const [frameIndex, setFrameIndex] = useState(0);
	const [scale, setScale] = useState({ x: 1, y: 1 });
	const resetScale = () => setScale({ x: 1, y: 1 });

	const defaultFrame = frames[actionName][direction][0];

	const [frameInterval, setFrameInterval] = useState(defaultFrame.duration);
	const [movementInterval, setMovementInterval] = useState(_movementInterval);

	const [x, setX] = useState(defaultFrame.x);
  const [y, setY] = useState(defaultFrame.y);

  const [width, setWidth] = useState(defaultFrame.width);
  const [height, setHeight] = useState(defaultFrame.height);

	const obstacleProps = ObstacleContext.useContext();

	const [position, setPosition] = useState({ x: startX, y: startY });
	const move = coordinates => {
		const newDirection = determineMovementDirection(position, coordinates);
		setDirection(newDirection);
		obstacleProps.update({ id, width, height, ...coordinates });
		setPosition(coordinates);
	};

	useIsMounted(() => {
		obstacleProps.update({ id, x, y, width, height });
	}, [])

	const environmentProps = EnvironmentContext.useContext();
	const environmentWidth = get(environmentProps, 'dimensions.x', 0);
	const environmentHeight = get(environmentProps, 'dimensions.y', 0);

	const spriteProps = SpriteContext.useContext();
	const {
		position: spritePosition,
		width: spriteWidth,
		height: spriteHeight,
		collisionOffsetX: spriteCollisionOffsetX,
		collisionOffsetY: spriteCollisionOffsetY,
	} = spriteProps;

	const obstacles = [
		...filter(get(environmentProps, 'layers', []), 'collision'),
		{
			x: spritePosition.x - spriteCollisionOffsetX,
			y: spritePosition.y - spriteCollisionOffsetY,
			width: spriteWidth + spriteCollisionOffsetX,
			height: spriteHeight + spriteCollisionOffsetY,
		},
	];

	const boundsX = useMemo(() => ({
		min: 0,
		max: environmentWidth - width,
	}), [environmentWidth, width]);

	const boundsY = useMemo(() => ({
		min: 0,
		max: environmentHeight - height,
	}), [environmentHeight, height]);

	const willCollide = (newCoordinates) => {
		return !!getCollisions({
			x: newCoordinates.x,
			y: newCoordinates.y,
			width,
			height,
			collisionOffsetX: collisionOffsets.x,
			collisionOffsetY: collisionOffsets.y,
			collisionElements: obstacles,
		}).length;
	};

	const shouldUpdatePosition = (nextCoordinates, bounds) => {
		if (willCollide(nextCoordinates)) return false;
		const xApproved = nextCoordinates.x >= bounds.x.min && nextCoordinates.x <= bounds.x.max;
		const yApproved = nextCoordinates.y >= bounds.y.min && nextCoordinates.y <= bounds.y.max;
		return xApproved && yApproved;
	};

	const randomMovement = () => {
		const axis = sample(['x', 'y']);
		const direction = random(random(-1, 0), random(0, 1));

		const newCoordinates = {
			...position,
			[axis]: position[axis] + (MOVEMENT_INCREMENT * direction),
		};

		if (shouldUpdatePosition(newCoordinates, { x: boundsX, y: boundsY })) {
			move(newCoordinates);
		}
		else {
			setDirection(currentDirection => FLIPPED_DIRECTIONS[currentDirection]);
		}
	};

	const frameMovement = (direction, movementIncrements) => {
		if (!movementIncrements) return;

		const multiplierX = DIRECTION_MULTIPLIERS[direction];
		const multiplierY = DIRECTION_MULTIPLIERS[direction];
		const newX = (multiplierX * movementIncrements.x * MOVEMENT_INCREMENT) + position.x;
		const newY = (multiplierY * movementIncrements.y * MOVEMENT_INCREMENT) + position.y;
		// const clampedX = clamp(newX, boundsX.min, boundsX.max);
		// const clampedY = clamp(newY, boundsY.min, boundsY.max);

		if (shouldUpdatePosition({ x: newX, y: newY }, { x: boundsX, y: boundsY })) {
			move({ x: newX, y: newY });
		}
		else {
			setDirection(currentDirection => FLIPPED_DIRECTIONS[currentDirection]);
		}
	};

	useInterval(() => {
		randomMovement();
	}, isRunning && movementInterval ? movementInterval : null);

	const action = (actionName, direction, currentFrameIndex = 0) => {
		const actionConfig = frames[actionName][direction];
    const frameConfig = actionConfig[currentFrameIndex];
		const nextFrameIndex = determineNextFrameIndex(actionConfig, currentFrameIndex);

    setX(frameConfig.x);
    setY(frameConfig.y);
		frameConfig.width && setWidth(frameConfig.width);
		frameConfig.height && setHeight(frameConfig.height);
		frameConfig.duration && setFrameInterval(frameConfig.duration);
		frameConfig.move && frameMovement(direction, frameConfig.move);
		frameConfig.scale ? setScale(frameConfig.scale) : resetScale();
    setFrameIndex(nextFrameIndex);
  };

  useInterval(() => {
    action(actionName, direction, frameIndex);
  }, isRunning ? frameInterval : null);

	const offsetX = scale.x > 0 ? 0 : -width;
	const offsetY = scale.y > 0 ? 0 : -height;
	const transform = `scale(${scale.x}, ${scale.y}) translate(${offsetX}, ${offsetY})`;
	const viewBox = `${(x * scale.x)} ${(y * scale.y)} ${width} ${height}`;

	return (
		<SVG
			viewBox={viewBox}
			x={position.x}
			y={position.y}
			width={width}
			height={height}
			id={id}
		>
			<g transform={transform}>
				{map(paths, path => <path key={path.fill} {...path} />)}
			</g>
		</SVG>
	);
}
