import firebase from 'firebase'
import { realtimeListener } from '../realtimeListener'
import { SubscribeHandlers } from '../types'
// import { fetchChannels } from './fetchChannels'
// import { fetchRoomMembers } from './fetchRoomMembers'

type FetchRoomsParams = {
  uid: string
  handlers: SubscribeHandlers
}
export const fetchRooms = async ({ uid, handlers }: FetchRoomsParams) => {
  const query = firebase.firestore().collectionGroup('room_members').where('uid', '==', uid)
  return await realtimeListener(query, handlers)
}
