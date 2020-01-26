// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as S from '@syncano/core'
process.env.SYNCANO_TEST_RUN_DIR = 'src'
process.env.SYNCANO_TEST_RUN_EXT = 'ts'
import * as SyncanoTest from '@syncano/test'
import {SinonStub, stub} from 'sinon'
import {SyncanoTestRun, DeepPartial} from './types'

declare module 'form-data' {}

const {Core} = S
let stubbed: SinonStub | null = null

const run = SyncanoTest.run as SyncanoTestRun

export const createSyncanoCoreMock = (customMock: DeepPartial<S.Core>) => {
  if (stubbed) {
    stubbed.restore()
  }

  stubbed = stub(S, 'Core' as any).callsFake((context: any) => {
    const syncano = new Core(context)
    const mock = customMock
    mock.logger = syncano.logger
    mock.response = syncano.response
    return mock
  })

  return {'@syncano/core': stubbed}
}

export {run}
