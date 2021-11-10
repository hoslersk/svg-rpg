import React, { useMemo } from 'react';
import { get, map } from 'lodash';

import AdvanceScreen from './advance-screen';
import EnvironmentContext from '../contexts/environment-context';
import SpriteContext from '../contexts/sprite-context';
import { ADVANCE_SCREEN_DIMENSIONS } from '../lib/constants';

import './screen.scss';

export default function Screen({ children, debug = false, ...etc }) {
  const environmentProps = EnvironmentContext.useContext(),
        spriteProps = SpriteContext.useContext();

  const positionX = get(spriteProps, 'position.x', 0),
        positionY = get(spriteProps, 'position.y', 0),
        environmentWidth = get(environmentProps, 'dimensions.x', 0),
        environmentHeight = get(environmentProps, 'dimensions.y', 0);

  const cameraPositionX = useMemo(() => {
          const width = ADVANCE_SCREEN_DIMENSIONS.x,
                maxX = environmentWidth - width;

          return Math.max(0, Math.min(positionX - width / 2, maxX));;
        }, [environmentWidth, positionX]),
        cameraPositionY = useMemo(() => {
          const height = ADVANCE_SCREEN_DIMENSIONS.y,
                maxY = environmentHeight - height;

          return Math.max(0, Math.min(positionY - height / 2, maxY));
        }, [environmentHeight, positionY]);

  return (
    <AdvanceScreen
      className="screen"
      cameraX={cameraPositionX}
      cameraY={cameraPositionY}
      {...etc}
    >
			{children}
			<DebugContent {...{ debug, spriteProps, environmentProps }} />
		</AdvanceScreen>
  );
}


function DebugContent({ debug, spriteProps, environmentProps }) {
	if (!debug) return null;
	return (
		<g>
			{map(environmentProps.links, ({ x, y, height, width }) => (
				<rect fill="blue" fillOpacity="0.5" {...{ x, y, height, width }} />
			))}
		</g>
	);
}
