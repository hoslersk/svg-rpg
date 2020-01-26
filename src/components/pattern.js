import React from 'react';
import { camelCase } from 'lodash';

import patternFragments from '../pattern-fragments';

const PATTERN_BASE_CONFIG = {
  width: 1,
  height: 1,
  patternUnits: 'objectBoundingBox',
  patternContentUnits: 'userSpaceOnUse',
};

export default function Pattern(props) {
  const { children, id, ...otherProps } = props,
        match = patternFragments[camelCase(id)],
        PatternFragment = match ? match.Component : null,
        predefinedProps = match ? match.defaultProps : {},
        patternProps = {
          ...PATTERN_BASE_CONFIG,
          ...{ id },
          ...predefinedProps || {},
          ...otherProps,
        };

  return (
    <pattern {...patternProps}>
      {PatternFragment && <PatternFragment />}
      {children}
    </pattern>
  );
}
