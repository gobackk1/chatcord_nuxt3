import * as firebaseFunctions from 'firebase-functions'

export const REGION = 'asia-northeast1'
export const CODE = {
  TRANSACTION_SUCCESS: 'TRANSACTION_SUCCESS',
  TRANSACTION_FAILURE: 'TRANSACTION_FAILURE',
  DOCUMENT_EXISTS: 'DOCUMENT_EXISTS',
  OK: 'OK',
  ALREADY_FRIENDS: 'ALREADY_FRIENDS',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS'
}
export const functions = firebaseFunctions.region('asia-northeast1')
export const logger = firebaseFunctions.logger
export class HttpsError extends firebaseFunctions.https.HttpsError{}
