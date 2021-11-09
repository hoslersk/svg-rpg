
export const ROOT_ENVIRONMENT_CONFIG = {
  dimensions: {
    x: 300,
    y: 200,
  },
  startingPoint: {
    x: 50,
    y: 50,
  },
  layers: [
    {
      id: 'grass',
      x: 0,
      y: 0,
      width: 300,
      height: 200,
    },
    {
      id: 'tree',
      collision: true,
      x: 240 / 2,
      y: 160 / 2,
      width: 34,
      height: 37,
    },
  ],
};

export const SCALA_ENVIRONMENT_CONFIG = {
  dimensions: {
    x: 240,
    y: 600,
  },
  startingPoint: {
    x: 138,
    y: 574,
  },
  startingDirection: 'up',
  layers: [
    {
      id: 'cliff-front',
      x: 0,
      y: 0,
      width: 128,
      height: 600,
      collision: true,
    },
    {
      id: 'cliff-front',
      x: 160,
      y: 0,
      width: 80,
      height: 600,
      collision: true,
    },
    // {
    //   id: 'cliff-left',
    //   x: 96,
    //   y: 0,
    //   width: 14,
    //   height: 16,
    // },
    // {
    //   id: 'cliff-left',
    //   x: 96,
    //   y: 8,
    //   width: 14,
    //   height: 16,
    // },
    // {
    //   id: 'cliff-left',
    //   x: 96,
    //   y: 16,
    //   width: 14,
    //   height: 16,
    // },

    {
      id: 'stair',
      x: 128,
      y: 0,
      width: 32,
      height: 600,
    }
  ],
};

export const VECTOR_ENVIRONMENT_CONFIG = {
  dimensions: {
    x: 300,
    y: 200,
  },
  startingPoint: {
    x: 100,
    y: 100,
  },
	startingDirection: 'right',
  layers: [
    // {
    //   id: 'grass',
    //   x: 0,
    //   y: 0,
    //   width: 300,
    //   height: 200,
    // },
  ],
};

export const GRAPHIUM_ENVIRONMENT_CONFIG = {
  camera: {
    x: 0,
    y: 0,
  },
  dimensions: {
    x: 300,
    y: 200,
  },
  startingPoint: {
    x: 200,
    y: 30,
  },
  layers: [
    // {
    //   id: 'grass',
    //   x: 0,
    //   y: 0,
    //   width: 300,
    //   height: 200,
    // },
  ],
};
