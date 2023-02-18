import * as admin from 'firebase-admin'
import { functions } from '../../const'

const db = admin.firestore

export const onDeletePublicUserData = functions.firestore
  .document('public_user_data/{userId}')
  .onDelete(async (change, { params }) => {
    // NOTE: 全てのサブコレクションを削除する
    const friendsRef = change.ref.collection('friends')
    const friendRequestsRef = change.ref.collection('friend_requests')
    // NOTE: 他のユーザーのフレンドから、アカウント削除したユーザーを削除する
    const friendsQuery = db().collectionGroup('friends').where('uid', '==', params.userId)
    // NOTE: 他のユーザーのリクエストから、アカウント削除したユーザーを削除する
    const friendRequestsQuery = db()
      .collectionGroup('friend_requests')
      .where('uid', '==', params.userId)

    db().runTransaction(async (transaction) => {
      const friendsSnapshot = await transaction.get(friendsRef)
      const friendRequestsSnapshot = await transaction.get(friendRequestsRef)
      const userFriendsDocRef = await transaction.get(friendsQuery)
      const userFriendRequestsDocRef = await transaction.get(friendRequestsQuery)

      friendsSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
      friendRequestsSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
      userFriendsDocRef.forEach((doc) => {
        transaction.delete(doc.ref)
      })
      userFriendRequestsDocRef.forEach((doc) => {
        console.log(doc)
        transaction.delete(doc.ref)
      })
    })
  })
