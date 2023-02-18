import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response, DocRef } from '../types'

type Data = {
  receiverUid: string
}

export const acceptFriendRequest = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const { receiverUid } = data
    const receiverRequestRef = admin
      .firestore()
      .doc(`public_user_data/${auth.uid}/friend_requests/${receiverUid}`)
    const senderRequestRef = admin
      .firestore()
      .doc(`public_user_data/${receiverUid}/friend_requests/${auth.uid}`)
    const senderFriendsRef = admin
      .firestore()
      .doc(`public_user_data/${auth.uid}/friends/${receiverUid}`) as DocRef<CC.FS.Friend>
    const friendFriendsRef = admin
      .firestore()
      .doc(`public_user_data/${receiverUid}/friends/${auth.uid}`) as DocRef<CC.FS.Friend>
    const directMessagesRef = admin
      .firestore()
      .collection('direct_messages')
      .doc() as DocRef<CC.FS.ChatRoomDirectMessage>

    return new Promise((resolve) => {
      admin.firestore().runTransaction(async (transaction) => {
        transaction.create(directMessagesRef, {
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
        const senderDmMemberRef = directMessagesRef
          .collection('direct_message_members')
          .doc(auth.uid)
        transaction.create(senderDmMemberRef, {
          uid: auth.uid,
          role: 'member',
          dmId: directMessagesRef.id
        })
        const receiverDmMemberRef = directMessagesRef
          .collection('direct_message_members')
          .doc(receiverUid)
        transaction.create(receiverDmMemberRef, {
          uid: receiverUid,
          role: 'member',
          dmId: directMessagesRef.id
        })
        transaction.delete(receiverRequestRef)
        transaction.delete(senderRequestRef)
        transaction.set(senderFriendsRef, {
          dmId: directMessagesRef.id,
          uid: receiverUid
        })
        transaction.set(friendFriendsRef, {
          dmId: directMessagesRef.id,
          uid: auth.uid
        })
      })
      resolve({ code: CODE.TRANSACTION_SUCCESS })
    })
  }
)
