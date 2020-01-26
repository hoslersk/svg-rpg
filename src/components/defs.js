import React from 'react';
import { get, map, pick } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
import SpriteContext from '../contexts/sprite-context';
import Pattern from './pattern';

export default function Defs(props) {
  const environmentProps = EnvironmentContext.useContext(),
        environmentPatternConfigs = get(environmentProps, 'layers', []),
        spriteProps = SpriteContext.useContext();

  const { children, ...otherProps } = props,
        environmentPatterns = map(environmentPatternConfigs, config =>
          <Pattern
            key={config.id}
            {...pick(config, 'id', 'patternUnits', 'patternContentUnits')}
          />
        ),
        spritePatterns = map(spriteProps.states, config =>
          !config.isDupe &&
          <Pattern
            key={config.id}
            {...pick(config, 'id', 'patternUnits', 'patternContentUnits')}
          />
        );

  return (
    <defs {...otherProps}>
      {environmentPatterns}
      {spritePatterns}
      {children}
    </defs>
  );
}
