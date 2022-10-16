import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
export default config;
