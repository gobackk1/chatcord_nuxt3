import * as admin from 'firebase-admin'
import { Response } from '../types'
import { functions, CODE, HttpsError } from '../const'

const db = admin.firestore

type Data = {
  roomId: string
}

export const destroyRoom = functions.https.onCall(
  async ({ roomId }: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const roomRef = db().collection('rooms').doc(roomId)
    const membersRef = roomRef.collection('room_members')

    await db().runTransaction(async (transaction) => {
      const snapshot = await transaction.get(membersRef)
      snapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
      // transaction.delete(roomRef)
    })

    return { code: CODE.TRANSACTION_SUCCESS, payload: { roomId } }
  }
)
