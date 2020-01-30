import React from 'react';

import Screen from '../components/screen';
import Defs from '../components/defs';
import Environment from '../components/environment';
import Sprite from '../components/sprite';
import { EnvironmentContextProvider } from '../contexts/environment-context';
import { SpriteContextProvider } from '../contexts/sprite-context';
import { ROOT_ENVIRONMENT_CONFIG } from '../lib/environments';
import { RS_SPRITE_CONFIG } from '../lib/sprites';
import {
  // RS_CLIFF_LEFT,
  // RS_CLIFF_FRONT,
  RS_DIRT_TEXTURE,
  RS_DIRT_TOP_EDGE,
  RS_DIRT_BOTTOM_EDGE,
  RS_DIRT_LEFT_EDGE,
  RS_DIRT_RIGHT_EDGE,
  RS_DIRT_TOP_LEFT_CORNER,
  RS_DIRT_TOP_RIGHT_CORNER,
  RS_DIRT_BOTTOM_LEFT_CORNER,
  RS_DIRT_BOTTOM_RIGHT_CORNER,
  RS_WATER_TREE,
  RS_STAIR,
} from '../lib/sprite-configs';
import { renderRawDataPattern } from '../lib/utils/parsers';

export default function Root() {
  return (
    <>
      <h1>Root</h1>
      <EnvironmentContextProvider value={ROOT_ENVIRONMENT_CONFIG}>
        <SpriteContextProvider
          environment={ROOT_ENVIRONMENT_CONFIG}
          sprite={RS_SPRITE_CONFIG}
        >
          <Screen>
            <Defs>
              {renderRawDataPattern('test', RS_STAIR)}
            </Defs>
            <Environment />
            <Sprite />
          </Screen>
        </SpriteContextProvider>
      </EnvironmentContextProvider>
    </>
  );
}
