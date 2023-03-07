module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  verbose: true,
  testTimeout: 10000,
}
