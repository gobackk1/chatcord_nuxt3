import firebase from 'firebase'

export const sendDirectMessage = async (
  dmId: string,
  text: string,
  user: firebase.User
): Promise<void> => {
  const message: CC.FS.ChatMessage = {
    text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    user,
  }
  await firebase
    .firestore()
    .collection(`direct_messages/${dmId}/direct_message_messages`)
    .add(message)
}
