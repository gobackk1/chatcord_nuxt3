import firebase from 'firebase'
import { isFirebaseError } from '../utils'

/**
 * - ログインに成功した場合は何も返さない
 * - ログインに失敗した場合は、エラーコードに対応したエラーメッセージを返す
 * - ログインに失敗した場合で、対応するエラーコードがない場合、エラーオブジェクトを投げる
 */
export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<undefined | string | never> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return
  } catch (error) {
    if (error instanceof Error) {
      if (isFirebaseError(error)) {
        if (error.code === 'auth/wrong-password') {
          return 'IDかパスワードが間違っています。'
        }
        if (error.code === 'auth/user-not-found') {
          return 'ユーザーが見つかりませんでした。'
        }
        throw error
      }
      throw error
    }
    throw error
  }
}
