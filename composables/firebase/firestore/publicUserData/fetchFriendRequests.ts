import { realtimeListener } from '../realtimeListener'
import { SubscribeHandlers } from '../types'
import firebase from 'firebase'

type FetchFriendsParams = {
  uid: string
  handlers: SubscribeHandlers
}
export const fetchFriendRequests = ({ uid, handlers }: FetchFriendsParams) => {
  const query = firebase.firestore().collection(`public_user_data/${uid}/friend_requests`)
  return realtimeListener(query, handlers)
}
