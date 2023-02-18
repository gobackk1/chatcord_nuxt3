import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response } from '../types'

const db = admin.firestore

type Data = {
  uid: string
}

export const deleteFriend = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const { uid } = data
    const userRef = await db().doc(`public_user_data/${auth.uid}/friends/${uid}`)
    const targetRef = await db().doc(`public_user_data/${uid}/friends/${auth.uid}`)

    return new Promise((resolve) => {
      db().runTransaction(async (transaction) => {
        transaction.delete(userRef)
        transaction.delete(targetRef)
      })
      resolve({ code: CODE.TRANSACTION_SUCCESS })
    })
  }
)
