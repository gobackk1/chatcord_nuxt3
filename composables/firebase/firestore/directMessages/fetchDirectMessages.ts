import { realtimeListener } from '../realtimeListener'
import { type SubscribeHandlers } from '../types'
import firebase from 'firebase'

interface FetchMessagesParams {
  dmId: string
  handlers: SubscribeHandlers
}
export const fetchDirectMessages = async ({
  dmId,
  handlers,
}: FetchMessagesParams): Promise<firebase.Unsubscribe> => {
  const query = firebase
    .firestore()
    .collection(`direct_messages/${dmId}/direct_message_messages`)
    .orderBy('createdAt', 'asc')
  // .limitToLast(10)
  return await realtimeListener(query, handlers)
}
