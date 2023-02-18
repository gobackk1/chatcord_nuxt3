import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response } from '../types'

const db = admin.firestore

type Data = {
  receiverUid: string
}

export const cancelFriendRequest = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const { receiverUid } = data
    const targetRequestRef = await db().doc(
      `public_user_data/${auth.uid}/friend_requests/${receiverUid}`
    )
    const myRequestRef = await db().doc(
      `public_user_data/${receiverUid}/friend_requests/${auth.uid}`
    )

    return new Promise((resolve) => {
      db().runTransaction(async (transaction) => {
        transaction.delete(targetRequestRef)
        transaction.delete(myRequestRef)
      })
      resolve({ code: CODE.TRANSACTION_SUCCESS })
    })
  }
)
