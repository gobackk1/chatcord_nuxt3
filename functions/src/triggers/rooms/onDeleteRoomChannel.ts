import * as admin from 'firebase-admin'
import { functions } from '../../const'

const db = admin.firestore

export const onDeleteRoomChannel = functions.firestore
  .document('rooms/{roomId}/channels/{channelId}')
  .onDelete((change, context) => {
    const messagesRef = db().collection(
      `rooms/${context.params.roomId}/channels/${context.params.channelId}/messages`
    )

    db().runTransaction(async (transaction) => {
      const snapshot = await transaction.get(messagesRef)
      snapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
    })
  })
