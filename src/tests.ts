// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as S from '@syncano/core'
process.env.SYNCANO_TEST_RUN_DIR = 'src'
process.env.SYNCANO_TEST_RUN_EXT = 'ts'
import * as SyncanoTest from '@syncano/test'
import {SinonStub, stub as sinonStub, SinonStubStatic} from 'sinon'
import {SyncanoTestRun, DeepPartial} from './types'

declare module 'form-data' {}

const {Core} = S
let stubbed: SinonStub | null = null

export const run = SyncanoTest.run as SyncanoTestRun

export const createSyncanoCoreMock = (customMock: DeepPartial<S.Core>) => {
  if (stubbed) {
    stubbed.restore()
  }

  stubbed = sinonStub(S, 'Core' as any).callsFake((context: any) => {
    const syncano = new Core(context)
    const mock = customMock
    mock.logger = syncano.logger
    mock.response = syncano.response
    return mock
  })

  return {'@syncano/core': stubbed}
}

declare module 'sinon' {
  interface SinonStub {
    dataMethod(methods: DeepPartial<S.DataClass<any>>): typeof methods
  }
}

export const stub: SinonStubStatic = (obj?: any, method?: any) => {
  const result = sinonStub(obj, method)
  result.dataMethod = (methods: S.DataClass<any>) => methods
  return result
}
