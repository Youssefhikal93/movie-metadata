import type {Config} from '@jest/types'

const Jestconfig:Config.InitialOptions ={
    preset : 'ts-jest',
    testEnvironment:'node',
    verbose:true,
    testMatch:["**/**/*.test.ts"],
    forceExit:true,
    clearMocks:true,
    testTimeout: 10000,
    collectCoverage: true
  
}
export default Jestconfig