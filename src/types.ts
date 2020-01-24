import * as S from '@syncano/core'
import Bluebird = require('bluebird')
export type SyncanoTestRun = <T extends {}>(
  endpointName: string,
  ctx: Partial<S.Context<T>>,
  params?: {
    mocks?: any
    [key: string]: any
  },
  callType?: 'endpoint' | 'eventHandler'
) => Bluebird<any>
