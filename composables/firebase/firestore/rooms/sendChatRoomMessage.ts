import firebase from 'firebase'

type SendChatRoomMessageParam = {
  roomId: string
  channelId: string
  message: string
  photoURL?: string | null
}
export const sendChatRoomMessage = async ({
  roomId,
  channelId,
  message,
  photoURL = ''
}: SendChatRoomMessageParam) => {
  firebase.firestore().collection(`rooms/${roomId}/channels/${channelId}/messages`).add({
    text: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    photoURL
  })
}
