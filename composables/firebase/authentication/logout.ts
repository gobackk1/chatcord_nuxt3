import firebase from 'firebase'

export const logout = async () => {
  await firebase.auth().signOut()
}
