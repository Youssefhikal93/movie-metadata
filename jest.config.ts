import type {Config} from '@jest/types'

const Jestconfig:Config.InitialOptions ={
    preset : 'ts-jest',
    testEnvironment:'node',
    verbose:true,
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)']

}

export default Jestconfig