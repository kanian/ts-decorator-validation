module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/dist/tests/.*\\.(test|spec)?\\.(js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ["/node_modules/", "/tests/fixtures/"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/fixtures/"
  ],
};