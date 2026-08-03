module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/src/test/setupTests.ts",
  ],

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
  ],

  testMatch: [
    "<rootDir>/src/**/*.test.(ts|tsx|js|jsx)",
  ],

  clearMocks: true,
};