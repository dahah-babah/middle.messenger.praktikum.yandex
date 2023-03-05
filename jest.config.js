module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '\\.(less|svg)$': 'jest-transform-stub',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
