import * as admin from 'firebase-admin'
import { functions } from '../../const'

const db = admin.firestore

export const onDeleteDirectMessages = functions.firestore
  .document('direct_messages/{dmId}')
  .onDelete((change) => {
    // 全てのサブコレクションを削除する
    const membersRef = change.ref.collection('direct_message_members')
    const messagesRef = change.ref.collection('direct_message_messages')

    db().runTransaction(async (transaction) => {
      const membersSnapshot = await transaction.get(membersRef)
      const messagesSnapshot = await transaction.get(messagesRef)

      membersSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })

      messagesSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
    })
  })
