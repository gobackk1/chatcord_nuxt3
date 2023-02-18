import firebase from 'firebase'

type UpdateRoomParam = Pick<CC.P.ChatRoom, 'id' | 'photoURL' | 'displayName' | 'name'>
export const updateRoom = async ({ id, photoURL, name, displayName }: UpdateRoomParam) => {
  await firebase.firestore().collection('rooms').doc(id).update({ photoURL, displayName, name })
}
