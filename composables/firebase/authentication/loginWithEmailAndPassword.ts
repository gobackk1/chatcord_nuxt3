import firebase from 'firebase'
import { isFirebaseError } from '../utils'

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
