import Grass from './grass';
import Tree from './tree';
import Stair from './stair';
import CliffFront from './cliff-front';
import CliffLeft from './cliff-left';

import SpriteFrontStanding from './sprite-front-standing';
import SpriteFrontWalkingOne from './sprite-front-walking-one';
import SpriteFrontWalkingTwo from './sprite-front-walking-two';

import SpriteBackStanding from './sprite-back-standing';
import SpriteBackWalkingOne from './sprite-back-walking-one';
import SpriteBackWalkingTwo from './sprite-back-walking-two';

import SpriteRightStanding from './sprite-right-standing';
import SpriteRightWalkingOne from './sprite-right-walking-one';
import SpriteRightWalkingTwo from './sprite-right-walking-two';

import SpriteLeftStanding from './sprite-left-standing';
import SpriteLeftWalkingOne from './sprite-left-walking-one';
import SpriteLeftWalkingTwo from './sprite-left-walking-two';


export default {
  grass: {
    defaultProps: {
      width: 16,
      height: 16,
      patternUnits: 'userSpaceOnUse',
      patternContentUnits: 'userSpaceOnUse',
    },
    Component: Grass,
  },
  tree: {
    defaultProps: {
      width: 1,
      height: 1,
      // patternUnits: 'userSpaceOnUse',
      // patternContentUnits: 'userSpaceOnUse',
    },
    Component: Tree,
  },
  cliffFront: {
    defaultProps: {
      width: 14,
      height: 16,
      patternUnits: 'userSpaceOnUse',
      patternContentUnits: 'userSpaceOnUse',
    },
    Component: CliffFront,
  },
  cliffLeft: {
    defaultProps: {
      width: 1,
      height: 1,
      // patternUnits: 'userSpaceOnUse',
      // patternContentUnits: 'userSpaceOnUse',
    },
    Component: CliffLeft,
  },
  stair: {
    defaultProps: {
      width: 32,
      height: 8,
      patternUnits: 'userSpaceOnUse',
      patternContentUnits: 'userSpaceOnUse',
    },
    Component: Stair,
  },

  spriteFrontStanding: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteFrontStanding,
  },
  spriteFrontWalkingOne: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteFrontWalkingOne,
  },
  spriteFrontWalkingTwo: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteFrontWalkingTwo,
  },

  spriteBackStanding: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteBackStanding,
  },
  spriteBackWalkingOne: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteBackWalkingOne,
  },
  spriteBackWalkingTwo: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteBackWalkingTwo,
  },

  spriteRightStanding: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteRightStanding,
  },
  spriteRightWalkingOne: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteRightWalkingOne,
  },
  spriteRightWalkingTwo: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteRightWalkingTwo,
  },

  spriteLeftStanding: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteLeftStanding,
  },
  spriteLeftWalkingOne: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteLeftWalkingOne,
  },
  spriteLeftWalkingTwo: {
    defaultProps: {
      width: 1,
      height: 1,
    },
    Component: SpriteLeftWalkingTwo,
  },
};
