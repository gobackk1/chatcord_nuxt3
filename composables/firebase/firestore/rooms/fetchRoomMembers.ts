import firebase from 'firebase'
import { realtimeListener } from '../realtimeListener'
import { SubscribeHandlers } from '../types'

export const fetchRoomMembers = async (
  roomId: string,
  handler: SubscribeHandlers
): Promise<firebase.Unsubscribe> => {
  const query = firebase.firestore().collection(`rooms/${roomId}/room_members`)
  return await realtimeListener(query, handler)
}
