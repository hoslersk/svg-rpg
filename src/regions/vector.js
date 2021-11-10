import React from 'react';

import AnalogPad from '../components/analog-pad';
import Screen from '../components/screen';
import Defs from '../components/defs';
import Environment from '../components/environment';
import NonPlayableCharacter from '../components/non-playable-character';
import Sprite from '../components/sprite';
import { EnvironmentContextProvider } from '../contexts/environment-context';
import { ObstacleContextProvider } from '../contexts/obstacle-context';
import { SpriteContextProvider } from '../contexts/sprite-context';
import { VECTOR_ENVIRONMENT_CONFIG } from '../lib/environments';
import { RS_SPRITE_CONFIG, GRUB_SPRITE_CONFIG } from '../lib/sprites';

export default function Vector() {
  return (
    <>
      <h1>Vector</h1>
      <EnvironmentContextProvider value={VECTOR_ENVIRONMENT_CONFIG}>
				<ObstacleContextProvider value={{ environment: VECTOR_ENVIRONMENT_CONFIG }}>
					<SpriteContextProvider
						environment={VECTOR_ENVIRONMENT_CONFIG}
						sprite={RS_SPRITE_CONFIG}
					>
						<Screen>
							<Defs>
								{/*renderRawDataPattern('test', RS_SPRITE_LEFT_WALKING_TWO)*/}
							</Defs>
							<Environment />
							<NonPlayableCharacter
								id="grub"
								startingAction="attack"
								startingDirection="left"
								startX={200}
								startY={90}
								{...GRUB_SPRITE_CONFIG}
							/>
							<Sprite />
						</Screen>
						<AnalogPad />
					</SpriteContextProvider>
				</ObstacleContextProvider>
      </EnvironmentContextProvider>
    </>
  );
}
