import * as admin from 'firebase-admin'
import { Response } from '../types'
import { functions, HttpsError, CODE } from '../const'

type Data = {
  uid: string
}

export const getUserByUid = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }
    const { uid } = data
    const user = await admin.auth().getUser(uid)
    return { code: CODE.OK, payload: user }
  }
)
