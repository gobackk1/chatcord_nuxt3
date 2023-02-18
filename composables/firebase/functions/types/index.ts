import * as F from '@functions/types'

export type CallableResponse<T = any> = {
  result: {
    code: F.Code
    payload: T
  }
}
export type CallableRequest<T> = {
  data: T
}
