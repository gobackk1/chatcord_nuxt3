import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response } from '../types'

export const deleteUser = functions.https.onCall(async (data, { auth }): Promise<Response> => {
  if (auth === null || auth === undefined) {
    return new HttpsError('unauthenticated', '不正なリクエストです。')
  }
  await admin.auth().deleteUser(auth.uid)
  return {
    code: CODE.OK
  }
})
