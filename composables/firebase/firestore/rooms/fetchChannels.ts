import firebase from 'firebase'
import { realtimeListener } from '../realtimeListener'
import { SubscribeHandlers } from '../types'

export const fetchChannels = async (
  roomId: string,
  handler: SubscribeHandlers
): Promise<firebase.Unsubscribe> => {
  const query = firebase.firestore().collection(`rooms/${roomId}/channels`)
  return await realtimeListener(query, handler)
}
