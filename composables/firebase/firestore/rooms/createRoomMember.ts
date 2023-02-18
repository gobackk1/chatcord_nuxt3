import firebase from 'firebase'

export const createRoomMember = async (
  roomId: string,
  uid: string,
  role = 'member'
): Promise<CC.P.PublicUserData> => {
  const documentRef = firebase.firestore().doc(`rooms/${roomId}/room_members/${uid}`)
  const member = { uid, role }
  await documentRef.set(member)
  const snapshot = await firebase.firestore().collection('public_user_data').doc(uid).get()
  return { ...(snapshot.data() as CC.P.PublicUserData) }
}
