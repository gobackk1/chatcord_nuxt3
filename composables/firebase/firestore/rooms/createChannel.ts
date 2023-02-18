import firebase from 'firebase'

export const createChannel = async (
  roomId: string,
  channelName: string
): Promise<CC.P.RoomChannel> => {
  const data: Partial<CC.FS.RoomChannel> = {
    name: channelName,
    topic: '',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }
  const reference = await firebase.firestore().collection(`rooms/${roomId}/channels`).add(data)
  const snapshot = await reference.get()
  const channel: CC.P.RoomChannel = {
    ...(snapshot.data() as CC.FS.RoomChannel),
    id: snapshot.id
  }
  return channel
}
