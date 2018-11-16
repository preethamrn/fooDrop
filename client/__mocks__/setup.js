const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

global.console.warn = jest.fn()
global.console.error = jest.fn()

global.window.alert = jest.fn()
