import React from 'react';

const DEFAULT_RECT_CONFIG = {
  width: 1,
  height: 1,
  x: 0,
  y: 0,
};

export default function Rect(props) {
  const rectProps = {
    ...DEFAULT_RECT_CONFIG,
    ...props,
  };

  return <rect {...rectProps} />
}
