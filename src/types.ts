import * as S from '@syncano/core'
import Bluebird = require('bluebird')

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}
declare module 'sinon' {
  export interface SinonStub {
    [key: string]: any
  }
}
export type SyncanoTestRun = <T extends {}>(
  endpointName: string,
  ctx: DeepPartial<S.Context<T>>,
  params?: {
    mocks?: any
    [key: string]: any
  },
  callType?: 'endpoint' | 'eventHandler'
) => Bluebird<any>
