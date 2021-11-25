import { map } from 'lodash';

import {
	BOY_SPRITE_PATH_CONFIGS,
	GRUB_SPRITE_PATH_CONFIGS,
	SLIME_SPRITE_PATH_CONFIGS,
} from './sprite-configs';

export const RS_SPRITE_CONFIG = {
  dimensions: {
    x: 14,
    y: 21,
  },
  collisionOffsets: {
    x: 0,
    y: -13,
  },
  states: [
    {
      id: 'sprite-front-standing',
      direction: 'down',
    },
    {
      id: 'sprite-front-walking-one',
      direction: 'down-down',
    },
    {
      isDupe: true,
      id: 'sprite-front-standing',
      direction: 'down-down-down',
    },
    {
      id: 'sprite-front-walking-two',
      direction: 'down-down-down-down',
    },
    {
      isDupe: true,
      id: 'sprite-front-standing',
      direction: 'down-down-down-down-down',
    },

    {
      id: 'sprite-back-standing',
      direction: 'up',
    },
    {
      id: 'sprite-back-walking-one',
      direction: 'up-up',
    },
    {
      isDupe: true,
      id: 'sprite-back-standing',
      direction: 'up-up-up',
    },
    {
      id: 'sprite-back-walking-two',
      direction: 'up-up-up-up',
    },
    {
      isDupe: true,
      id: 'sprite-back-standing',
      direction: 'up-up-up-up-up',
    },

    {
      id: 'sprite-right-standing',
      direction: 'right',
    },
    {
      id: 'sprite-right-walking-one',
      direction: 'right-right',
    },
    {
      isDupe: true,
      id: 'sprite-right-standing',
      direction: 'right-right-right',
    },
    {
      id: 'sprite-right-walking-two',
      direction: 'right-right-right-right',
    },
    {
      isDupe: true,
      id: 'sprite-right-standing',
      direction: 'right-right-right-right-right',
    },

    {
      id: 'sprite-left-standing',
      direction: 'left',
    },
    {
      id: 'sprite-left-walking-one',
      direction: 'left-left',
    },
    {
      isDupe: true,
      id: 'sprite-left-standing',
      direction: 'left-left-left',
    },
    {
      id: 'sprite-left-walking-two',
      direction: 'left-left-left-left',
    },
    {
      isDupe: true,
      id: 'sprite-left-standing',
      direction: 'left-left-left-left-left',
    },
  ],
};

const grubDefaultFramesLeft = [
	{
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		duration: 500,
	},
	{
		x: 32,
		y: 0,
		width: 32,
		height: 32,
		duration: 500,
	},
];

const grubDefaultFramesRight = map(grubDefaultFramesLeft, frame => ({
	...frame,
	scale: {
		x: -1,
		y: 1,
	}
}));

const grubAttackFramesLeft = [
	{
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		duration: 200,
	},
	{
		x: 64,
		y: 0,
		width: 32,
		height: 32,
		duration: 200,
		move: {
			x: 1,
			y: 0,
		},
	},
	{
		x: 96,
		y: 0,
		width: 32,
		height: 32,
		duration: 300,
		move: {
			x: 8,
			y: 0,
		},
	},
	{
		x: 32,
		y: 0,
		width: 32,
		height: 32,
		duration: 300,
	},
];

const grubAttackFramesRight = map(grubAttackFramesLeft, frame => ({
	...frame,
	scale: {
		x: -1,
		y: 1,
	}
}));

export const GRUB_SPRITE_CONFIG = {
	defaultDirection: 'left',
	dimensions: {
    x: 32,
    y: 32,
  },
  collisionOffsets: {
    x: 0,
    y: 0,
  },
	sheetDimensions: {
		width: 128,
		height: 32,
	},
	paths: GRUB_SPRITE_PATH_CONFIGS,
	frames: {
		default: {
			left: grubDefaultFramesLeft,
			right: grubDefaultFramesRight,
			up: grubDefaultFramesRight,
			down: grubDefaultFramesLeft,
		},
		attack: {
			left: grubAttackFramesLeft,
			right: grubAttackFramesRight,
			up: grubAttackFramesRight,
			down: grubAttackFramesLeft
		},
	},
};


const slimeIdleFramesDown = [
	{
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 32,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 64,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 96,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 128,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 160,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 192,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 224,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
];

export const SLIME_SPRITE_CONFIG = {
	defaultDirection: 'down',
	dimensions: {
    x: 32,
    y: 32,
  },
  collisionOffsets: {
    x: 0,
    y: 0,
  },
	sheetDimensions: {
		width: 256,
		height: 32,
	},
	paths: SLIME_SPRITE_PATH_CONFIGS,
	frames: {
		default: {
			up: slimeIdleFramesDown,
			right: slimeIdleFramesDown,
			down: slimeIdleFramesDown,
			left: slimeIdleFramesDown,
		},
	},
};


const boyIdleFramesRight = [
	{
		x: 0,
		y: 0,
		width: 32,
		height: 32,
		duration: 200,
	},
	{
		x: 32,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 64,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 96,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 128,
		y: 0,
		width: 32,
		height: 32,
		duration: 200,
	},
	{
		x: 96,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
	{
		x: 64,
		y: 0,
		width: 32,
		height: 32,
		duration: 100,
	},
];


export const BOY_SPRITE_CONFIG = {
	defaultDirection: 'right',
	dimensions: {
    x: 32,
    y: 32,
  },
  collisionOffsets: {
    x: 0,
    y: 0,
  },
	sheetDimensions: {
		width: 160,
		height: 32,
	},
	paths: BOY_SPRITE_PATH_CONFIGS,
	frames: {
		default: {
			up: boyIdleFramesRight,
			right: boyIdleFramesRight,
			down: boyIdleFramesRight,
			left: boyIdleFramesRight,
		},
	},
};

