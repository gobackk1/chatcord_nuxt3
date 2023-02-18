import * as admin from 'firebase-admin'
import { functions, HttpsError, CODE } from '../const'
import { Response } from '../types'

const db = admin.firestore

type UserProfile = {
  photoURL: string
  displayName: string
}

// Authentication に onUpdate がないので、ユーザーの情報を更新するときは
// callable function を用いて Authentication と Firestore 両方の
// データを更新する
export const updateProfile = functions.https.onCall(
  async (data: Partial<UserProfile>, { auth }): Promise<Response> => {
    if (!auth) {
      return new HttpsError('unauthenticated', '不正なリクエストです。')
    }
    console.log(data)
    // displayName が既存のユーザーと重複した場合、別の displayName を入力させる
    if (data.displayName) {
      const snapshot = await db()
        .collection('public_user_data')
        .where('displayName', '==', data.displayName)
        .get()
      if (!snapshot.empty) {
        return {
          code: CODE.ALREADY_EXISTS,
        }
      }
    }

    const updateUserProfile: Partial<UserProfile> = {}
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        updateUserProfile[key as keyof UserProfile] = value
      }
    }

    const [, userRecord] = await Promise.all([
      db()
        .collection('public_user_data')
        .doc(auth.uid)
        .update(updateUserProfile),
      admin.auth().updateUser(auth.uid, updateUserProfile),
    ])
    return {
      code: CODE.OK,
      payload: {
        user: userRecord,
      },
    }
  }
)
