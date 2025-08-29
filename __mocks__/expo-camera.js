/* global jest */
export const Camera = {
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
};

export const CameraType = {
  back: 'back',
  front: 'front',
};

export default Camera;
