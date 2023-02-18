import firebase from 'firebase'

export const getToken = async (): Promise<string | null> => {
  const user = firebase.auth().currentUser
  const token = user ? await user.getIdToken() : null
  return token
}
