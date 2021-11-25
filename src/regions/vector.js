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
import { BOY_SPRITE_CONFIG, RS_SPRITE_CONFIG, SLIME_SPRITE_CONFIG } from '../lib/sprites';
import HealthBar from '../components/health-bar';

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
							<Defs />
							<Environment />
							{/* <NonPlayableCharacter
								id="grub"
								startingAction="attack"
								startingDirection="left"
								startX={200}
								startY={90}
								{...GRUB_SPRITE_CONFIG}
							/> */}
							<NonPlayableCharacter
								id="slime"
								startX={VECTOR_ENVIRONMENT_CONFIG.dimensions.x - 64}
								startY={32}
								startingDirection="down"
								movementInterval={null}
								{...SLIME_SPRITE_CONFIG}
							/>
							<NonPlayableCharacter
								id="boy"
								startX={24}
								startY={VECTOR_ENVIRONMENT_CONFIG.dimensions.y - 64}
								startingDirection="right"
								movementInterval={null}
								{...BOY_SPRITE_CONFIG}
							/>
							{/* <Sprite /> */}
							<HealthBar
								x={VECTOR_ENVIRONMENT_CONFIG.dimensions.x - 60}
								y={15}
								current={33}
								max={100}
							/>
							<HealthBar
								x={10}
								y={VECTOR_ENVIRONMENT_CONFIG.dimensions.y - 15}
								current={75}
								max={100}
							/>
						</Screen>
						{/* <AnalogPad /> */}
					</SpriteContextProvider>
				</ObstacleContextProvider>
      </EnvironmentContextProvider>
    </>
  );
}
