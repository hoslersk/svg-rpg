import React from 'react';
import { map } from 'lodash';

import { TREE_PATTERN_PATHS } from '../lib/pattern-configs';

export default function Tree() {
  return (
		<>
			<>
				{map(TREE_PATTERN_PATHS, pathConfig => (
					<path key={`${pathConfig.fill}+${pathConfig.fillOpacity}`} {...pathConfig} />
				))}
			</>
		</>
	);
}
