import React from 'react';
import { map } from 'lodash';

import { GRASS_PATTERN_PATHS } from '../lib/pattern-configs';

export default function Grass() {
	return (
		<>
			{map(GRASS_PATTERN_PATHS, pathConfig => (
				<path key={`${pathConfig.fill}+${pathConfig.fillOpacity}`} {...pathConfig} />
			))}
		</>
	);
}
