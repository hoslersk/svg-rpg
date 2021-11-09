import React, { useMemo } from 'react';
import { debounce, filter, get, map, some, split, throttle } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
import ObstacleContext from '../contexts/obstacle-context';
import SpriteContext from '../contexts/sprite-context';
import { useOnKeyPress } from '../lib/hooks';
import Rect from './rect';
import {
  MOVEMENT_INCREMENT,
  THROTTLE_WAIT_DURATION,
} from '../lib/constants';


function determineDirection(currentDirection, newDirection) {

  if (newDirection === 'up') {
    if (!currentDirection.includes('up')) return 'up';
    if (currentDirection === 'up') return 'up-up';
    if (currentDirection === 'up-up') return 'up-up-up';
    if (currentDirection === 'up-up-up') return 'up-up-up-up';
    if (currentDirection === 'up-up-up-up') return 'up-up-up-up-up';
    if (currentDirection === 'up-up-up-up-up') return 'up-up';
  }

  if (newDirection === 'down') {
    if (!currentDirection.includes('down')) return 'down';
    if (currentDirection === 'down') return 'down-down';
    if (currentDirection === 'down-down') return 'down-down-down';
    if (currentDirection === 'down-down-down') return 'down-down-down-down';
    if (currentDirection === 'down-down-down-down') return 'down-down-down-down-down';
    if (currentDirection === 'down-down-down-down-down') return 'down-down';
  }

  if (newDirection === 'right') {
    if (!currentDirection.includes('right')) return 'right';
    if (currentDirection === 'right') return 'right-right';
    if (currentDirection === 'right-right') return 'right-right-right';
    if (currentDirection === 'right-right-right') return 'right-right-right-right';
    if (currentDirection === 'right-right-right-right') return 'right-right-right-right-right';
    if (currentDirection === 'right-right-right-right-right') return 'right-right';
  }

  if (newDirection === 'left') {
    if (!currentDirection.includes('left')) return 'left';
    if (currentDirection === 'left') return 'left-left';
    if (currentDirection === 'left-left') return 'left-left-left';
    if (currentDirection === 'left-left-left') return 'left-left-left-left';
    if (currentDirection === 'left-left-left-left') return 'left-left-left-left-left';
    if (currentDirection === 'left-left-left-left-left') return 'left-left';
  }
}


export default function Sprite(props) {
  const environmentProps = EnvironmentContext.useContext();
  const environmentWidth = get(environmentProps, 'dimensions.x', 0);
  const environmentHeight = get(environmentProps, 'dimensions.y', 0);

	const obstacleProps = ObstacleContext.useContext();

	const obstacles = [
		...filter(get(environmentProps, 'layers', []), 'collision'),
		...map(obstacleProps.dynamic),
	];

	const spriteProps = SpriteContext.useContext();
	const {
		position,
		setPosition,
		setDirection,
		fill,
		width,
		height,
		collisionOffsetX,
		collisionOffsetY,
	} = spriteProps;

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
							newCoordinates.x - collisionOffsetX/* + speedY */< obstacle.x + obstacle.width &&
							newCoordinates.y + height > obstacle.y &&
							newCoordinates.y - collisionOffsetY < obstacle.y + obstacle.height;
		});
	};

	const shouldUpdatePosition = (bounds, nextCoordinate) => {
		return nextCoordinate >= bounds.min && nextCoordinate <= bounds.max;
	};

	const shouldUpdatePositionX = nextCoordinates => {
		if (willCollide(nextCoordinates)) return false;
		return shouldUpdatePosition(boundsX, nextCoordinates.x);
	};

	const shouldUpdatePositionY = nextCoordinates => {
		if (willCollide(nextCoordinates)) return false;
		return shouldUpdatePosition(boundsY, nextCoordinates.y);
	};

  const moveUp = throttle(() => {
		setDirection(direction => determineDirection(direction, 'up'));
		setPosition(({ x, y }) => {
			const newY = y - MOVEMENT_INCREMENT,
			newCoordinates = { x, y: newY };

			if (shouldUpdatePositionY(newCoordinates)) return newCoordinates;
			return ({ x, y });
		});
	}, THROTTLE_WAIT_DURATION);

	const moveDown = throttle(() => {
		setDirection(direction => determineDirection(direction, 'down'));
		setPosition(({ x, y }) => {
			const newY = y + MOVEMENT_INCREMENT,
						newCoordinates = { x, y: newY };

			if (shouldUpdatePositionY(newCoordinates)) return newCoordinates;
			return ({ x, y });
		});
	}, THROTTLE_WAIT_DURATION);

	const moveRight = throttle(() => {
		setDirection(direction => determineDirection(direction, 'right'));
		setPosition(({ x, y }) => {
			const newX = x + MOVEMENT_INCREMENT,
						newCoordinates = { x: newX, y };

			if (shouldUpdatePositionX(newCoordinates)) return newCoordinates;
			return ({ x, y });
		});
	}, THROTTLE_WAIT_DURATION);

	const moveLeft = throttle(() => {
		setDirection(direction => determineDirection(direction, 'left'));
		setPosition(({ x, y }) => {
			const newX = x - MOVEMENT_INCREMENT,
						newCoordinates = { x: newX, y };

			if (shouldUpdatePositionX(newCoordinates)) return newCoordinates;
			return ({ x, y });
		});
	}, THROTTLE_WAIT_DURATION);

	const rest = debounce(() => {
		setDirection(direction => split(direction, '-')[0]);
	}, THROTTLE_WAIT_DURATION);

  useOnKeyPress('ArrowUp', moveUp, rest);
  useOnKeyPress('ArrowDown', moveDown, rest);
  useOnKeyPress('ArrowLeft', moveLeft, rest);
  useOnKeyPress('ArrowRight', moveRight, rest);

  return (
    <g className="sprite">
      <Rect
        x={position.x}
        y={position.y}
        height={height}
        width={width}
        fill={fill}
      />
    </g>
  );
}
