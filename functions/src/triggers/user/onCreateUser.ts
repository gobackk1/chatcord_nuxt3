import * as admin from 'firebase-admin'
import { functions } from '../../const'
/**
 * ユーザー作成時に、以下の情報をFirestoreのドキュメントとして作成する
 * - auth provider側のデータがあれば初期値として、公開可能なデータに加える
 */
export const onCreateUser = functions.auth.user().onCreate((user) => {
  const publicUserData: CC.FS.PublicUserData = {
    displayName: user.displayName || '',
    photoURL: user.photoURL || ''
  }
  return admin.firestore().doc(`public_user_data/${user.uid}`).set(publicUserData)
})
