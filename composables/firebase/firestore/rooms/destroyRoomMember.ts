import firebase from 'firebase'

export const destroyRoomMember = async (roomId: string, uid: string): Promise<void> => {
  await firebase.firestore().collection(`rooms/${roomId}/room_members/`).doc(uid).delete()
}
