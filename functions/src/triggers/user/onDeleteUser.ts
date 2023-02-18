import * as admin from 'firebase-admin'
import { functions } from '../../const'

const db = admin.firestore
const storage = admin.storage

/**
 * ユーザーの削除時に、関連するデータを全て削除する。
 * サブコレクションはなるべくドキュメントのonDeleteトリガーで削除する
 * 削除するもの
 * - public_user_dataのドキュメント
 * - direct_messagesのドキュメント
 * - room_membersのドキュメント
 * - ストレージにアップロードしたデータ
 */
export const onDeleteUser = functions.auth.user().onDelete((user) => {
  // NOTE: delete trigger が二回呼ばれることがある
  // ユーザー削除後にトリガーした場合、user.uid が null になるからリターンさせる
  if (user.metadata.creationTime === null) return

  const publicUserDataRef = db().collection('public_user_data').doc(user.uid)
  const directMessageMembersQuery = db()
    .collectionGroup('direct_message_members')
    .where('uid', '==', user.uid)
  const roomMembersQuery = db().collectionGroup('room_members').where('uid', '==', user.uid)

  db().runTransaction(async (transaction) => {
    const directMessageMembersSnapshot = await transaction.get(directMessageMembersQuery)
    const roomMembersSnapshot = await transaction.get(roomMembersQuery)

    transaction.delete(publicUserDataRef)
    directMessageMembersSnapshot.forEach((doc) => {
      // DMの場合はrootのドキュメントごと消すので、parentを参照して消す
      // direct_messagesのドキュメントのサブコレクションは、direct_messagesのonDeleteトリガーで削除する
      const directMessageDocRef = db().doc(doc.ref.parent.parent!.path)
      transaction.delete(directMessageDocRef)
    })
    roomMembersSnapshot.forEach((doc) => {
      transaction.delete(doc.ref)
    })
  })

  storage()
    .bucket()
    .deleteFiles({
      prefix: `images/users/${user.uid}`
    })
})
