import React from 'react';

import SVG from './svg';
import { ADVANCE_SCREEN_DIMENSIONS } from '../lib/constants';

const { x: width, y: height } = ADVANCE_SCREEN_DIMENSIONS;

export default function AdvanceScreen({ cameraX, cameraY, ...otherProps }) {
  const advanceScreenProps = {
    ...{ viewBox: `${cameraX || 0} ${cameraY || 0} ${width} ${height}` },
    ...otherProps,
  };

  return <SVG {...advanceScreenProps} />;
}
