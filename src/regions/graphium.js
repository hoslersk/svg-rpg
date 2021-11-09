import React from 'react';

import Screen from '../components/screen';
import Defs from '../components/defs';
import Environment from '../components/environment';
import NonPlayableCharacter from '../components/non-playable-character';
import Sprite from '../components/sprite';
import { EnvironmentContextProvider } from '../contexts/environment-context';
import { ObstacleContextProvider } from '../contexts/obstacle-context';
import { SpriteContextProvider } from '../contexts/sprite-context';
import { GRAPHIUM_ENVIRONMENT_CONFIG } from '../lib/environments';
import { RS_SPRITE_CONFIG, GRUB_SPRITE_CONFIG } from '../lib/sprites';

export default function Graphium() {
  return (
    <>
      <h1>Graphium</h1>
      <EnvironmentContextProvider value={GRAPHIUM_ENVIRONMENT_CONFIG}>
				<ObstacleContextProvider value={{ environment: GRAPHIUM_ENVIRONMENT_CONFIG }}>
					<SpriteContextProvider
						environment={GRAPHIUM_ENVIRONMENT_CONFIG}
						sprite={RS_SPRITE_CONFIG}
					>
						<Screen>
							<Defs>
								{/*renderRawDataPattern('test', RS_SPRITE_LEFT_WALKING_TWO)*/}
							</Defs>
							<Environment />
							<NonPlayableCharacter id="grub" startX={230} startY={40} {...GRUB_SPRITE_CONFIG} />
							<Sprite />
						</Screen>
					</SpriteContextProvider>
				</ObstacleContextProvider>
      </EnvironmentContextProvider>
    </>
  );
}
