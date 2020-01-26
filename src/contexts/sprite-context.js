import React, { createContext, useContext, useMemo, useState } from "react";
import { find } from 'lodash';

const SpriteContext = createContext(null);

export function SpriteContextProvider({ children, environment, sprite }) {

  const [positionX, setPositionX] = useState(40),
        [positionY, setPositionY] = useState(40),
        [direction, setDirection] = useState('down');

  const fill = useMemo(() => {
    const matchingState = find(sprite.states, ['direction', direction]),
          matchingId = matchingState ? matchingState.id : sprite.states[0].id;
          
    return `url(#${matchingId})`;
  }, [direction, sprite.states]);

  const spriteProps = {
    positionX,
    setPositionX,
    positionY,
    setPositionY,
    direction,
    setDirection,
    fill,
    width: sprite.dimensions.x,
    height: sprite.dimensions.y,
    collisionOffsetX: sprite.collisionOffsets.x,
    collisionOffsetY: sprite.collisionOffsets.y,
    states: sprite.states,
  };

  return (
    <SpriteContext.Provider value={spriteProps}>
      {children}
    </SpriteContext.Provider>
  );
}


function useSpriteContext() {
  const context = useContext(SpriteContext);
  if (!context) throw new Error('useSpriteContext needs a SpriteContextProvider');
  return context;
}


export function withSpriteContext(Component) {
  return function SpriteContextComponent(props) {
    return (
      <SpriteContext.Consumer>
        {context => <Component {...props} {...context} />}
      </SpriteContext.Consumer>
    );
  };
}


export default {
  Provider: SpriteContextProvider,
  Context: SpriteContext,
  Consumer: SpriteContext.Consumer,
  useContext: useSpriteContext,
  withContext: withSpriteContext,
};
