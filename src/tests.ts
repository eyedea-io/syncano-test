import * as S from '@syncano/core'
process.env.SYNCANO_TEST_RUN_DIR = 'src'
process.env.SYNCANO_TEST_RUN_EXT = 'ts'
import * as SyncanoTest from '@syncano/test'
import {SinonStub, stub} from 'sinon'
import {SyncanoTestRun, DeepPartial} from './types'

declare module 'form-data' {}

let stubbed: SinonStub | null = null

const run = SyncanoTest.run as SyncanoTestRun

export const createSyncanoCoreMock = (customMock: DeepPartial<S.Core>) => {
  if (stubbed) {
    stubbed.restore()
  }

  stubbed = stub(S, 'Core' as any).callsFake(() => customMock)

  return {'@syncano/core': stubbed}
}

export {run}
