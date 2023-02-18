import * as admin from 'firebase-admin'
import {
  onCreateUser,
  onDeleteUser,
  onDeletePublicUserData,
  onDeleteDirectMessages,
  onDeleteRoom,
  onDeleteRoomChannel,
  // onFinalize
} from './triggers'
import {
  createRoom,
  destroyRoom,
  acceptFriendRequest,
  requestToBecomeFriend,
  cancelFriendRequest,
  deleteFriend,
  getUserByUid,
  searchByUserName,
  updateProfile,
  deleteUser,
} from './modules'

admin.initializeApp()
// export { onCreateRoomMember } from './triggers'
export {
  onCreateUser,
  onDeleteUser,
  onDeletePublicUserData,
  onDeleteDirectMessages,
  onDeleteRoom,
  onDeleteRoomChannel,
  createRoom,
  acceptFriendRequest,
  requestToBecomeFriend,
  cancelFriendRequest,
  deleteFriend,
  getUserByUid,
  searchByUserName,
  updateProfile,
  deleteUser,
  destroyRoom,
  // onFinalize
}
