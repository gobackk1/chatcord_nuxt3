import * as admin from 'firebase-admin'
import { Response } from '../types'
import { functions, CODE, HttpsError } from '../const'

const db = admin.firestore

type Data = {
  name: string
  uid: string
}

export const createRoom = functions.https.onCall(
  async ({ name, uid }: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }
    const roomRef = db().collection('rooms').doc()
    const membersRef = roomRef.collection('room_members').doc(uid)
    const channelsRef1 = roomRef
      .collection('channels')
      .doc() as FirebaseFirestore.DocumentReference<CC.FS.RoomChannel>

    const roomDocument: CC.FS.ChatRoom = {
      name,
      displayName: name,
      photoURL: '',
      createdAt: db.FieldValue.serverTimestamp()
    }
    const memberDocument: CC.FS.RoomMember = { role: 'admin', uid, members: [] }
    const channelDocument1: CC.FS.RoomChannel = {
      name: 'チャンネル1',
      topic: '',
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp()
    }

    await db().runTransaction(async (transaction) => {
      await Promise.all([
        transaction.set(roomRef, roomDocument),
        transaction.set(membersRef, memberDocument),
        transaction.set(channelsRef1, channelDocument1)
      ])
    })

    return { code: CODE.TRANSACTION_SUCCESS, payload: { roomId: roomRef.id } }
  }
)
