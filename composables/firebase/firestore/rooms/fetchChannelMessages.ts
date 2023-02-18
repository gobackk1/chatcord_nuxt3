import { realtimeListener } from '../realtimeListener'
import { SubscribeHandlers } from '../types'
import firebase from 'firebase'

type Params = {
  roomId: string
  channelId: string
  handlers: SubscribeHandlers
}
export const fetchChannelMessages = ({ roomId, channelId, handlers }: Params) => {
  const query = firebase
    .firestore()
    .collection(`rooms/${roomId}/channels/${channelId}/messages`)
    .orderBy('createdAt', 'asc')
  return realtimeListener(query, handlers)
}
