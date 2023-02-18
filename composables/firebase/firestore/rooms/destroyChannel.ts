import firebase from 'firebase'

export const destroyChannel = async (roomId: string, channelId: string): Promise<void> => {
  await firebase.firestore().collection(`rooms/${roomId}/channels`).doc(channelId).delete()
}
