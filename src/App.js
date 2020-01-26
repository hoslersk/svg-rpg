import React from 'react';

import Screen from './components/screen';
import Defs from './components/defs';
import Environment from './components/environment';
import Sprite from './components/sprite';
import { EnvironmentContextProvider } from './contexts/environment-context';
import { SpriteContextProvider } from './contexts/sprite-context';

import { ROOT_ENVIRONMENT_CONFIG } from './lib/environments';
import { RS_SPRITE_CONFIG } from './lib/sprites';

function App() {

  return (
    <>
      <header>header</header>
      <main>
        <h1>Root</h1>
        <EnvironmentContextProvider value={ROOT_ENVIRONMENT_CONFIG}>
          <SpriteContextProvider
            environment={ROOT_ENVIRONMENT_CONFIG}
            sprite={RS_SPRITE_CONFIG}
          >
            <Screen>
              <Defs>
                {/*renderRawDataPattern('test', RS_SPRITE_LEFT_WALKING_TWO)*/}
              </Defs>
              <Environment />
              <Sprite />
            </Screen>
          </SpriteContextProvider>
        </EnvironmentContextProvider>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
