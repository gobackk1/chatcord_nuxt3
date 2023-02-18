import * as admin from 'firebase-admin'
import { functions, HttpsError } from '../const'
import { Response } from '../types'

const db = admin.firestore

type Data = {
  receiverUid: string
}

export const requestToBecomeFriend = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const receiverUid: string = data.receiverUid
    const receiverFriendRequestRef = await db().doc(
      `public_user_data/${receiverUid}/friend_requests/${auth.uid}`
    )
    const senderFriendRequestRef = await db().doc(
      `public_user_data/${auth.uid}/friend_requests/${receiverUid}`
    )
    const snapshot = await receiverFriendRequestRef.get()

    if (snapshot.exists) {
      return { code: 'DOCUMENT_EXISTS' }
    } else {
      return new Promise<Response>((resolve, reject) => {
        try {
          db().runTransaction(async (transaction) => {
            transaction.set(receiverFriendRequestRef, {
              type: 'receive',
              uid: auth.uid,
            })
            transaction.set(senderFriendRequestRef, {
              type: 'send',
              uid: receiverUid,
            })
          })
          resolve({ code: 'TRANSACTION_SUCCESS' })
        } catch (error) {
          reject({ code: 'TRANSACTION_FAILURE', error: (error as any).message })
        }
      })
    }
  }
)
