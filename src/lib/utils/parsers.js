import React from 'react';
import { forEach, split, trim } from 'lodash';

import Pattern from '../components/pattern';
import Rect from '../components/svg';

export function parseColorFromC(string) {
  const splitString = string.match(/.{1,2}/g),
        // alpha = splitString[1],
        red = splitString[4],
        green = splitString[3],
        blue = splitString[2];

  return `#${red}${green}${blue}`;
}

export function parseArrayFromString(dataString) {
  const array = split(trim(dataString), /,\s*/);
  return array;
}

export function renderRawDataPattern(id, config, props = {}) {
  const {
          // frameCount,
          frameWidth,
          // frameHeight,
          dataString,
        } = config,
        parsedData = parseArrayFromString(dataString),
        pixels = [];

  let rowNumber = 0;

  forEach(parsedData, (color, index) => {
    if (!color.includes('0x00')) {
      pixels.push(
        <Rect
          key={`${color}${rowNumber}${index}`}
          x={index < frameWidth ? index : index - (rowNumber * frameWidth)}
          y={rowNumber}
          fill={parseColorFromC(color)}
        />
      );
    }
    if ((index + 1) % frameWidth === 0) rowNumber += 1;
  });

  return (
    <Pattern id={id} {...props}>
      {pixels}
    </Pattern>
  );
}
