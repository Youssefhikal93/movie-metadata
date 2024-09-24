import type {Config} from '@jest/types'

const Jestconfig:Config.InitialOptions ={
    preset : 'ts-jest',
    testEnvironment:'node',
    verbose:true,
    // testMatch:["**/**/*.test.ts"],
    testMatch:["**/**/*.test.ts"],
    testPathIgnorePatterns:["src/test/integration.test.ts"],
    forceExit:true,
    clearMocks:true,
    testTimeout: 10000,
    collectCoverage: true,
    collectCoverageFrom:['src/**/*.ts',"!src/**/*.test.ts"]
  
}
export default Jestconfig