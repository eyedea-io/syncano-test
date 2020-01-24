import merge from 'lodash/merge'
import * as S from '@syncano/core'
process.env.SYNCANO_TEST_RUN_DIR = 'src'
process.env.SYNCANO_TEST_RUN_EXT = 'ts'
import * as SyncanoTest from '@syncano/test'
import {SinonStub, stub} from 'sinon'
import {SyncanoTestRun} from './types'
import {DeepPartial} from 'ts-essentials'

declare module 'form-data' {}

const {Core} = S
let stubbed: SinonStub | null = null

const run = SyncanoTest.run as SyncanoTestRun

export const createSyncanoCoreMock = (customMock: DeepPartial<S.Core>) => {
  if (stubbed) {
    stubbed.restore()
  }

  stubbed = stub(S, 'Core' as any).callsFake((context: any) => {
    let syncano = new Core(context)

    syncano = merge(syncano, customMock)

    if (customMock.data) {
      // Overwrite syncano.data Proxy with object
      syncano.data = customMock.data as any
    }

    return syncano
  })

  return {'@syncano/core': stubbed}
}

export {run}
