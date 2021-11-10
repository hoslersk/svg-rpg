import React, { useEffect, useRef, useState } from 'react';
import { useDrag } from '@use-gesture/react'

import SpriteContext from '../contexts/sprite-context';

import './analog-pad.scss';

const DEFAULT_X = 50;
const DEFAULT_Y = 25;
const DEFAULT_RADIUS = 15;

export default function AnalogPad() {
	const [bounds, setBounds] = useState({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	const outerRef = useRef(null);

	useEffect(() => {
		if (outerRef.current) {
			setBounds(outerRef.current.getBoundingClientRect())
		}
	}, [outerRef.current])

	return (
		<svg className="analog-pad" viewBox="-1 -1 102 52">
			<defs>
				<radialGradient id="analog-pad-recess-fill" cx="40%" cy="40%" r="55%">
					<stop offset="0%" stopColor="#ccc"/>
					<stop offset="100%" stopColor="#555"/>
				</radialGradient>
				<radialGradient id="analog-pad-recess-stroke" cx="75%" cy="75%" r="55%">
					<stop offset="0%" stopColor="#ccc"/>
					<stop offset="100%" stopColor="#555"/>
				</radialGradient>
				<filter id="analog-pad-control-filter" x="-25%" y="-25%" width="150%" height="150%">
					<feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
					<feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
					<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
				</filter>
			</defs>
			<circle
				className="analog-pad__recess"
				r="25"
				cx="50"
				cy="25"
				fill="url(#analog-pad-recess-fill)"
				stroke="url(#analog-pad-recess-stroke)"
				strokeWidth="1"
				ref={outerRef}
			/>
			<AnalogPadControl {...{ bounds }} />
		</svg>
	)
}


function calculateDistanceFromCenter(dot1 = [0, 0], dot2 = [0, 0]) {
	var x1 = dot1[0],
			y1 = dot1[1],
			x2 = dot2[0],
			y2 = dot2[1];
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}


// https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle
function clampCircleCoordinates({ x, y, radius, center = [0, 0] }) {
	const distance = calculateDistanceFromCenter([x, y], center);
	if (distance <= radius) return { x, y };
	const radians = Math.atan2(y - center[1], x - center[0])
	return {
		x: Math.cos(radians) * radius + center[0],
		y: Math.sin(radians) * radius + center[1]
	}
}


function AnalogPadControl({ bounds }) {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const spriteProps = SpriteContext.useContext();
	const {
		moveUp,
		moveRight,
		moveDown,
		moveLeft,
		rest,
	} = spriteProps;

	const move = coordinates => {
		const x = Math.abs(coordinates.x);
		const y = Math.abs(coordinates.y);

		if (x > y) {
			if (coordinates.x < 0) moveLeft();
			if (coordinates.x > 0) moveRight();
		}
		if (y > x) {
			if (coordinates.y < 0) moveUp();
			if (coordinates.y > 0) moveDown();
		}
	};

	const bind = useDrag(({ down, movement: [mx, my] }) => {
		if (down) {
			const newCoordinates = clampCircleCoordinates({ x: mx, y: my, radius: 10 });
			setX(newCoordinates.x);
			setY(newCoordinates.y);
			move(newCoordinates)
		}
		else {
			setX(0);
			setY(0);
			rest();
		}
	}, {
		bounds,
		rubberband: true,
	});

	return (
		<circle
			className="analog-pad__control"
			r={DEFAULT_RADIUS}
			cx={DEFAULT_X}
			cy={DEFAULT_Y}
			fill="#eee"
			filter="url(#analog-pad-control-filter)"
			style={{ transform: `translate(${x}px, ${y}px)` }}
			{...bind()}
		/>
	);
}
