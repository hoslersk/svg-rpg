
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
