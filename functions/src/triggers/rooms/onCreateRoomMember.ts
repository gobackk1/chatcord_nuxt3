// import * as admin from 'firebase-admin'
// import { functions } from '../../const'

// const db = admin.firestore

// export const onCreateRoomMember = functions.firestore
//   .document('rooms/{roomId}/room_members/{channelId}')
//   .onCreate((change) => {
//     const query = db().collection(`${change.ref.parent.path}`)

//     return db().runTransaction<void>(async (transaction) => {
//       const snapshot = await transaction.get(query)
//       const members: string[] = []
//       snapshot.forEach((doc) => {
//         members.push(doc.id)
//       })
//       snapshot.forEach((doc) => {
//         transaction.update(doc.ref, { members })
//       })
//     })
//   })
export {}
