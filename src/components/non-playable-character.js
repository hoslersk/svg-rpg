import React, { useMemo, useState } from 'react';
import { filter, get, map, random, sample, some } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
import ObstacleContext from '../contexts/obstacle-context';
import SpriteContext from '../contexts/sprite-context';
import { useInterval, useIsMounted } from '../lib/hooks';
import { MOVEMENT_INCREMENT } from '../lib/constants';


function determineNextFrameIndex(frames, currentIndex) {
	if (currentIndex + 1 >= frames.length) return 0;
	return currentIndex + 1;
}


export default function NonPlayableCharacter(props) {
	const { frames, id, paths, collisionOffsets, startX = 0, startY = 0 } = props;

	const [isRunning/*, setIsRunning*/] = useState(true);
	const [actionName/*, setActionName*/] = useState('default');
	const [direction/*, setDirection*/] = useState('down');
	const [frameIndex, setFrameIndex] = useState(0);

	const defaultFrame = frames[actionName][direction][0];

	const [delay, setDelay] = useState(defaultFrame.duration);

	const [x, setX] = useState(defaultFrame.x);
  const [y, setY] = useState(defaultFrame.y);

  const [width, setWidth] = useState(defaultFrame.width);
  const [height, setHeight] = useState(defaultFrame.height);

	const obstacleProps = ObstacleContext.useContext();

	const [position, setPosition] = useState({ x: startX, y: startY });
	const move = coordinates => {
		obstacleProps.update({ id, width, height, ...coordinates });
		setPosition(coordinates);
	};

	useIsMounted(() => {
		obstacleProps.update({ id, x, y, width, height });
	}, [])

  const action = (actionName, direction, currentFrameIndex = 0) => {
		const actionConfig = frames[actionName][direction];
    const frameConfig = actionConfig[currentFrameIndex];
		const nextFrameIndex = determineNextFrameIndex(actionConfig, currentFrameIndex);

    setX(frameConfig.x);
    setY(frameConfig.y);
		frameConfig.width && setWidth(frameConfig.width);
		frameConfig.height && setHeight(frameConfig.height);
		frameConfig.duration && setDelay(frameConfig.duration);
    setFrameIndex(nextFrameIndex);
  };

  useInterval(() => {
    action(actionName, direction, frameIndex);
  }, isRunning ? delay : null);

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
		return some(obstacles, obstacle => {
			return newCoordinates.x + width/* + speedX */> obstacle.x &&
							newCoordinates.x - collisionOffsets.x/* + speedY */< obstacle.x + obstacle.width &&
							newCoordinates.y + height > obstacle.y &&
							newCoordinates.y - collisionOffsets.y < obstacle.y + obstacle.height;
		});
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
	};

	useInterval(() => {
		randomMovement();
	}, isRunning ? delay : null);

	const viewBox = `${x} ${y} ${width} ${height}`;

	return (
		<svg viewBox={viewBox} x={position.x} y={position.y} width={width} height={height}>
			{map(paths, path => <path key={path.fill} {...path} />)}
		</svg>
	);
}
