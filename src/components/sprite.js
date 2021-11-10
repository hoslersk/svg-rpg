import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import EnvironmentContext from '../contexts/environment-context';
import SpriteContext from '../contexts/sprite-context';
import { useOnKeyPress } from '../lib/hooks';
import { getCollisions } from '../lib/utils/collision';
import Rect from './rect';


export default function Sprite() {
	const history = useHistory();

  const environmentProps = EnvironmentContext.useContext();

	const spriteProps = SpriteContext.useContext();
	const {
		position,
		fill,
		width,
		height,
		collisionOffsetX,
		collisionOffsetY,
		moveUp,
		moveRight,
		moveDown,
		moveLeft,
		rest,
	} = spriteProps;

	const linkCollision = useMemo(() => {
		return getCollisions({
			x: position.x,
			y: position.y,
			height,
			width,
			collisionOffsetX,
			collisionOffsetY,
			collisionElements: environmentProps.links,
		})[0];
	}, [position, environmentProps.links]);

	useEffect(() => {
		if (linkCollision) history.push(linkCollision.to, linkCollision.state);
	}, [linkCollision]);

  useOnKeyPress('ArrowUp', moveUp, rest);
	useOnKeyPress('w', moveUp, rest);
  useOnKeyPress('ArrowDown', moveDown, rest);
	useOnKeyPress('s', moveDown, rest);
  useOnKeyPress('ArrowLeft', moveLeft, rest);
	useOnKeyPress('a', moveLeft, rest);
  useOnKeyPress('ArrowRight', moveRight, rest);
	useOnKeyPress('d', moveRight, rest);

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
