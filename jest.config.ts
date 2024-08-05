import type {Config} from '@jest/types'

const Jestconfig:Config.InitialOptions ={
    preset : 'ts-jest',
    testEnvironment:'node',
    verbose:true,
    testTimeout: 10000

}

export default Jestconfig