import * as admin from 'firebase-admin'
import { functions } from '../../const'

const db = admin.firestore
const storage = admin.storage
const bucketName = process.env.FUNCTIONS_EMULATOR ? 'default-bucket' : undefined

export const onDeleteRoom = functions.firestore
  .document('rooms/{roomId}')
  .onDelete((change, context) => {
    const roomMembersRef = db().collection(`rooms/${context.params.roomId}/room_members`)
    const roomChannelsRef = db().collection(`rooms/${context.params.roomId}/channels`)

    db().runTransaction(async (transaction) => {
      const membersSnapshot = await transaction.get(roomMembersRef)
      const channelsSnapshot = await transaction.get(roomChannelsRef)

      membersSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
      channelsSnapshot.forEach((doc) => {
        transaction.delete(doc.ref)
      })
    })

    storage()
      .bucket(bucketName)
      .deleteFiles({ prefix: `images/rooms/${context.params.roomId}` })
  })
