import firebase from 'firebase'

export const sendEmailVerification = async (): Promise<void> => {
  const currentUser = firebase.auth().currentUser
  if (!currentUser) return
  currentUser.sendEmailVerification()
}
