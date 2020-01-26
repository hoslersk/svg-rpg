import React from 'react';

import SVG from './svg';
import { ADVANCE_SCREEN_DIMENSIONS } from '../lib/constants';

export default function AdvanceScreen({ cameraX, cameraY, ...otherProps }) {
  const advanceScreenProps = {
    ...{ viewBox: `${cameraX || 0} ${cameraY || 0} ${ADVANCE_SCREEN_DIMENSIONS.x} ${ADVANCE_SCREEN_DIMENSIONS.y}` },
    ...otherProps,
  };

  return <SVG {...advanceScreenProps} />;
}
