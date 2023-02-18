import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response } from '../types'

const db = admin.firestore

type Data = {
  userName: string
}

/**
 * NOTE: フレンド申請するユーザーを探すために用いる。
 * ユーザーを取得したい場合は getUserByUid を使う
 */
export const searchByUserName = functions.https.onCall(
  async (data: Data, { auth }): Promise<Response> => {
    if (auth === null || auth === undefined) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }

    const { userName } = data
    const publicUserDataRef = db().collection('public_user_data')
    const query = publicUserDataRef.where('displayName', '==', userName)
    const snapshot = (await query.get()) as FirebaseFirestore.QuerySnapshot<CC.FS.PublicUserData>

    return new Promise((resolve) => {
      if (snapshot.empty) {
        resolve({
          code: CODE.NOT_FOUND
        })
      }
      snapshot.forEach(async (doc) => {
        const friendShip = await db()
          .collection(`public_user_data/${doc.id}/friends`)
          .doc(auth.uid)
          .get()
        const user = { ...doc.data(), uid: doc.id }
        if (friendShip.exists) {
          resolve({
            code: CODE.ALREADY_FRIENDS,
            payload: { user }
          })
        } else {
          resolve({
            code: CODE.OK,
            payload: { user }
          })
        }
      })
    })
  }
)
