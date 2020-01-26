
export const ROOT_ENVIRONMENT_CONFIG = {
  camera: {
    x: 0,
    y: 0,
  },
  dimensions: {
    x: 300,
    y: 200,
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
