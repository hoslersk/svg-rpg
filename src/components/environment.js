import React from 'react';
import { get, map } from 'lodash';

import EnvironmentContext from '../contexts/environment-context';
import Rect from './rect';

export default function Environment() {
  const environmentProps = EnvironmentContext.useContext(),
        layerConfigs = get(environmentProps, 'layers', []);

  return (
    <g className="environment">
      {map(layerConfigs, (layerConfig, index) => {
        const { x, y, width, height, id } = layerConfig,
              fill = `url(#${id})`,
              rectProps = {
                key: index,
                fill,
                width,
                height,
                x,
                y,
              };

        return <Rect {...rectProps} />;
      })}
    </g>
  );
}
