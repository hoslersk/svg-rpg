import React from 'react';
import { floor } from 'lodash';


export default function HealthBar({ current, max, x, y }) {
	const barWidth = 50;
	const indicatorWidth = floor((current / max) * barWidth);
	return (
		<g className="health-bar">
			<text fontSize="5" x={x} y={y - 2}>
				HP: {current}/{max}
			</text>
			<rect {...{ x, y }} width={barWidth} height="5" strokeWidth="1" stroke="#000" fill="none" />
			<rect x={x + 1} y={y + 1} width={indicatorWidth} height="3" fill="#00ff00" />
		</g>
	);
}
