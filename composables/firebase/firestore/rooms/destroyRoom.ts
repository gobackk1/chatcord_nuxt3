import * as functions from '../../functions'

export const destroyRoom = async (roomId: string): Promise<void> => {
  // await firebase.firestore().collection('rooms').doc(roomId).delete()
  await functions.destroyRoom(roomId)
}
