import React, { createContext, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { find, get } from 'lodash';
import { useEffect } from 'react/cjs/react.development';

const SpriteContext = createContext(null);

export function SpriteContextProvider({ children, environment, sprite }) {
	const location = useLocation();

  const [position, setPosition] = useState({
          x: get(environment, 'startingPoint.x', 40),
          y: get(environment, 'startingPoint.y', 40),
        }),
        [direction, setDirection] = useState(get(environment, 'startingDirection', 'down'));

  const fill = useMemo(() => {
    const matchingState = find(sprite.states, ['direction', direction]),
          matchingId = matchingState ? matchingState.id : sprite.states[0].id;

    return `url(#${matchingId})`;
  }, [direction, sprite.states]);

	useEffect(() => {
		if (location.state) {
			setPosition({
				x: location.state.x,
				y: location.state.y,
			});
			location.state.direction && setDirection(location.state.direction);
		}
	}, [location.state])

  const spriteProps = {
    position,
    setPosition,
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
