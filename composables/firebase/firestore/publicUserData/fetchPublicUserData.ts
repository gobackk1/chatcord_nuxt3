import firebase from 'firebase'

export const fetchPublicUserData = (uid: string) => {
  const snapshot = firebase.firestore().collection('public_user_data').doc(uid).get()
  return snapshot
}
