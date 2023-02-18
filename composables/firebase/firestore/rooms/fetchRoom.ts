import firebase from 'firebase'
import { SubscribeHandlers } from '../types'
import { realtimeListener } from '../realtimeListener'

type Params = {
  channelsHandler: SubscribeHandlers
  membersHandler: SubscribeHandlers
}

export const fetchRoom = async (roomId: string): Promise<CC.P.ChatRoom> => {
  const snapshot = await firebase.firestore().collection('rooms').doc(roomId).get()

  const rooms: CC.P.ChatRoom = {
    ...(snapshot.data() as CC.FS.ChatRoom),
    channels: [],
    members: [],
    id: snapshot.id,
    listeners: [],
    destroy() {
      this.listeners.forEach((listener) => {
        listener()
      })
    }
  }

  return rooms
}
