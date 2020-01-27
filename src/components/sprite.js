import React, { useMemo } from 'react';
import { debounce, filter, get, some, split, throttle } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
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
  const environmentProps = EnvironmentContext.useContext(),
        environmentWidth = get(environmentProps, 'dimensions.x', 0),
        environmentHeight = get(environmentProps, 'dimensions.y', 0),
        obstacles = filter(get(environmentProps, 'layers', []), 'collision'),
        spriteProps = SpriteContext.useContext(),
        {
          positionX,
          setPositionX,
          positionY,
          setPositionY,
          // direction,
          setDirection,
          fill,
          width,
          height,
          collisionOffsetX,
          collisionOffsetY,
          // spriteState,
          // setSpriteState,
          // moveUp,
          // moveDown,
          // moveLeft,
          // moveRight,
        } = spriteProps;


  const boundsX = useMemo(() => ({
          min: 0,
          max: environmentWidth - width,
        }), [environmentWidth, width]),
        boundsY = useMemo(() => ({
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
        },
        shouldUpdatePosition = (bounds, nextCoordinate) => {
          return nextCoordinate >= bounds.min && nextCoordinate <= bounds.max;
        },
        shouldUpdatePositionX = nextCoordinate => {
          if (willCollide({ x: nextCoordinate, y: positionY })) return false;
          return shouldUpdatePosition(boundsX, nextCoordinate);
        },
        shouldUpdatePositionY = nextCoordinate => {
          if (willCollide({ x: positionX, y: nextCoordinate })) return false;
          return shouldUpdatePosition(boundsY, nextCoordinate);
        };

  const moveUp = throttle(() => {
        setDirection(direction => determineDirection(direction, 'up'));
        setPositionY(y => {
          const newPosition = y - MOVEMENT_INCREMENT;
          if (shouldUpdatePositionY(newPosition)) return newPosition;
          return y;
        });
      }, THROTTLE_WAIT_DURATION),
      moveDown = throttle(() => {
        setDirection(direction => determineDirection(direction, 'down'));
        setPositionY(y => {
          const newPosition = y + MOVEMENT_INCREMENT;
          if (shouldUpdatePositionY(newPosition)) return newPosition;
          return y;
        });
      }, THROTTLE_WAIT_DURATION),
      moveRight = throttle(() => {
        setDirection(direction => determineDirection(direction, 'right'));
        setPositionX(x => {
          const newPosition = x + MOVEMENT_INCREMENT;
          if (shouldUpdatePositionX(newPosition)) return newPosition;
          return x;
        });
      }, THROTTLE_WAIT_DURATION),
      moveLeft = throttle(() => {
        setDirection(direction => determineDirection(direction, 'left'));
        setPositionX(x => {
          const newPosition = x - MOVEMENT_INCREMENT;
          if (shouldUpdatePositionX(newPosition)) return newPosition;
          return x;
        });
      }, THROTTLE_WAIT_DURATION),
      rest = debounce(() => {
        setDirection(direction => split(direction, '-')[0]);
      }, THROTTLE_WAIT_DURATION);

  useOnKeyPress('ArrowUp', moveUp, rest);
  useOnKeyPress('ArrowDown', moveDown, rest);
  useOnKeyPress('ArrowLeft', moveLeft, rest);
  useOnKeyPress('ArrowRight', moveRight, rest);

  return (
    <g className="sprite">
      <Rect
        x={positionX}
        y={positionY}
        height={height}
        width={width}
        fill={fill}
      />
    </g>
  );
}
