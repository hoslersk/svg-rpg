import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { debounce, filter, find, get, map, split, throttle } from 'lodash';

import ObstacleContext from '../contexts/obstacle-context';
import { getCollisions } from '../lib/utils/collision';
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


const SpriteContext = createContext(null);


export function SpriteContextProvider({ children, environment, sprite }) {
	const location = useLocation();

  const [position, setPosition] = useState({
		x: get(environment, 'startingPoint.x', 40),
		y: get(environment, 'startingPoint.y', 40),
	});

  const [direction, setDirection] = useState(get(environment, 'startingDirection', 'down'));

	const obstacleProps = ObstacleContext.useContext();

	const obstacles = [
		...filter(get(environment, 'layers', []), 'collision'),
		...map(obstacleProps.dynamic),
	];

  const fill = useMemo(() => {
    const matchingState = find(sprite.states, ['direction', direction]),
          matchingId = matchingState ? matchingState.id : sprite.states[0].id;

    return `url(#${matchingId})`;
  }, [direction, sprite.states]);

	const boundsX = useMemo(() => ({
		min: 0,
		max: environment.dimensions.x - sprite.dimensions.x,
	}), [environment.dimensions.x, sprite.dimensions.x]);
	const boundsY = useMemo(() => ({
			min: 0,
			max: environment.dimensions.y - sprite.dimensions.y,
	}), [environment.dimensions.y, sprite.dimensions.y]);

	useEffect(() => {
		if (location.state) {
			setPosition({
				x: location.state.x,
				y: location.state.y,
			});
			location.state.direction && setDirection(location.state.direction);
		}
	}, [location.state])

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

	const willCollide = (newCoordinates, elements = obstacles) => {
		return !!getCollisions({
			x: newCoordinates.x,
			y: newCoordinates.y,
			width: sprite.dimensions.x,
			height: sprite.dimensions.y,
			collisionOffsetX: sprite.collisionOffsets.x,
			collisionOffsetY: sprite.collisionOffsets.y,
			collisionElements: elements,
		}).length;
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

  const spriteProps = {
    position,
    setPosition,
    direction,
    setDirection,
    fill,
    width: sprite.dimensions.x,
    height: sprite.dimensions.y,
    collisionOffsetX: sprite.collisionOffsets.x,
    collisionOffsetY: sprite.collisionOffsets.y,
    states: sprite.states,
		moveUp,
		moveRight,
		moveDown,
		moveLeft,
		rest,
  };

  return (
    <SpriteContext.Provider value={spriteProps}>
      {children}
    </SpriteContext.Provider>
  );
}


function useSpriteContext() {
  const context = useContext(SpriteContext);
  if (!context) throw new Error('useSpriteContext needs a SpriteContextProvider');
  return context;
}


export function withSpriteContext(Component) {
  return function SpriteContextComponent(props) {
    return (
      <SpriteContext.Consumer>
        {context => <Component {...props} {...context} />}
      </SpriteContext.Consumer>
    );
  };
}


export default {
  Provider: SpriteContextProvider,
  Context: SpriteContext,
  Consumer: SpriteContext.Consumer,
  useContext: useSpriteContext,
  withContext: withSpriteContext,
};
