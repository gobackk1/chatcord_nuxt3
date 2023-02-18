import firebase from 'firebase'

export const updateChannel = async (roomId: string, { id, name }: CC.P.RoomChannel) => {
  const updatedAt = firebase.firestore.FieldValue.serverTimestamp()
  await firebase
    .firestore()
    .collection(`rooms/${roomId}/channels`)
    .doc(id)
    .update({ name, updatedAt })
}
