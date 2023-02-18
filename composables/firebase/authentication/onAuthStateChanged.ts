import firebase from 'firebase'

export const onAuthStateChanged = (
  callback: (user: firebase.User | null) => void | Promise<void>
): firebase.Unsubscribe => {
  const unsubscribe = firebase.auth().onAuthStateChanged(callback)
  return unsubscribe
}
