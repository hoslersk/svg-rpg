
export const ROOT_ENVIRONMENT_CONFIG = {
  dimensions: {
    x: 300,
    y: 200,
  },
  startingPoint: {
    x: 50,
    y: 120,
  },
	links: [
		{
			x: 224,
			y: 0,
			width: 32,
			height: 14,
			to: '/scala',
			state: {
				x: 136,
				y: 568,
				direction: 'up',
			},
		},
	],
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
      x: 128,
      y: 128,
      width: 32,
      height: 32,
    },
		{
      id: 'cliff-front',
      x: 0,
      y: 0,
      width: 224,
      height: 30,
      collision: true,
    },
    {
      id: 'cliff-front',
      x: 256,
      y: 0,
      width: 44,
      height: 30,
      collision: true,
    },
		{
      id: 'stair',
      x: 224,
      y: 0,
      width: 32,
      height: 30,
    }
  ],
};

export const SCALA_ENVIRONMENT_CONFIG = {
  dimensions: {
    x: 240,
    y: 600,
  },
  startingPoint: {
    x: 138,
    y: 568,
  },
  startingDirection: 'up',
	links: [
		{
			x: 128,
      y: 590,
      width: 32,
			height: 14,
			to: '/',
			state: {
				x: 232,
				y: 4,
				direction: 'down',
			},
		},
	],
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
		x: 240,
		y: 160,
  },
  startingPoint: {
    x: 30,
    y: 100,
  },
	startingDirection: 'right',
	links: [],
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
	links: [],
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
