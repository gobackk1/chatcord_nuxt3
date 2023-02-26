import firebase from 'firebase'
import { isFirebaseError } from '../utils'

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | string | never> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    /**
     * emulator に登録したユーザの emailVerified を true にする方法
     * https://firebase.google.com/docs/emulator-suite/connect_auth#emulated_email_email_link_and_anonymous_authentication
     */
    // TODO: メール確認実装
    // await firebase.auth().currentUser!.sendEmailVerification()
    return
  } catch (error) {
    if (error instanceof Error) {
      if (isFirebaseError(error)) {
        if (error.code === 'auth/email-already-in-use') {
          return 'このメールアドレスは既に登録されています。'
        } else if (error.code === 'auth/invalid-email') {
          return '無効なメールアドレスです。'
        } else {
          throw error
        }
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
}
