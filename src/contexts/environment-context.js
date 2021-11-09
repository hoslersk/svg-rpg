import React, { useContext } from 'react';

const EnvironmentContext = React.createContext(null);


export function EnvironmentContextProvider({ children, value }) {
  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}


function useEnvironmentContext() {
  const context = useContext(EnvironmentContext);
  if (!context) throw new Error('useEnvironmentContext needs an EnvironmentContextProvider');
  return context;
}


export function withEnvironmentContext(Component) {
  return function EnvironmentContextComponent(props) {
    return (
      <EnvironmentContext.Consumer>
        {context => <Component {...props} {...context} />}
      </EnvironmentContext.Consumer>
    );
  };
}


export default {
  Provider: EnvironmentContextProvider,
  Context: EnvironmentContext,
  Consumer: EnvironmentContext.Consumer,
  useContext: useEnvironmentContext,
  withContext: withEnvironmentContext,
};
