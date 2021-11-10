import React, { createContext, useContext, useState } from 'react';

const ObstacleContext = createContext(null);


export function ObstacleContextProvider({ children, environment }) {
	const [dynamicObstacles, setDynamicObstacles] = useState({});

	const update = obstacle => setDynamicObstacles(obstacles => ({
		...obstacles,
		[obstacle.id]: obstacle,
	}));

	const obstacleProps = {
		dynamic: dynamicObstacles,
		environment: environment?.layers || [],
		update,
	};

  return (
    <ObstacleContext.Provider value={obstacleProps}>
      {children}
    </ObstacleContext.Provider>
  );
}


function useObstacleContext() {
  const context = useContext(ObstacleContext);
  if (!context) throw new Error('useObstacleContext needs an ObstacleContextProvider');
  return context;
}


export function withObstacleContext(Component) {
  return function ObstacleContextComponent(props) {
    return (
      <ObstacleContext.Consumer>
        {context => <Component {...props} {...context} />}
      </ObstacleContext.Consumer>
    );
  };
}


export default {
  Provider: ObstacleContextProvider,
  Context: ObstacleContext,
  Consumer: ObstacleContext.Consumer,
  useContext: useObstacleContext,
  withContext: withObstacleContext,
};
