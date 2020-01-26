import React from 'react';

const DEFAULT_SVG_CONFIG = {
  xmlns: 'http://www.w3.org/2000/svg',
};

export default function SVG(props) {
  const svgProps = {
    ...DEFAULT_SVG_CONFIG,
    ...props,
  };
  
  return <svg {...svgProps} />;
}
