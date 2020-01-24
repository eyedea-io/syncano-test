import * as S from '@syncano/core'
import Bluebird = require('bluebird')
import {DeepPartial} from 'ts-essentials'
export type SyncanoTestRun = <T extends {}>(
  endpointName: string,
  ctx: DeepPartial<S.Context<T>>,
  params?: {
    mocks?: any
    [key: string]: any
  },
  callType?: 'endpoint' | 'eventHandler'
) => Bluebird<any>
