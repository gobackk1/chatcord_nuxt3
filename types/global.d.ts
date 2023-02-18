/**
 * NOTE:
 * Prefix CC
 * プロダクトの型。prefixが何もついていない場合はサードパーティの型と考える
 *
 * Prefix FS
 * Firestoreに格納するドキュメントの型
 *
 * Prefix P
 * - firestoreのドキュメントの型に、Product側で必要なデータを追加した型
 * - サードパーティの型をプロダクト側の都合で拡張したもの
 */
import type firebase from 'firebase'
import { type Component } from 'vue'

type FieldValue = firebase.firestore.FieldValue
type Timestamp = firebase.firestore.Timestamp
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare global {
  namespace CC {
    namespace FS {
      interface Friend {
        uid: string
        dmId: string
      }

      interface RoomDirectMessage {
        createdAt: FieldValue | Timestamp
      }

      interface ChatMessage {
        text: string
        createdAt: FieldValue | Timestamp
        user: firebase.User
      }

      interface RoomMember {
        role: 'admin' | 'member'
        uid: string
        members: string[]
      }

      interface PublicUserData {
        displayName: string
        photoURL: string
      }

      interface ChatRoomDirectMessage {
        createdAt: FieldValue | Timestamp
      }

      interface ChatRoom {
        name: string
        displayName: string
        photoURL: string
        createdAt: FieldValue | Timestamp
      }

      interface RoomChannel {
        name: string
        topic: string
        createdAt: FieldValue | Timestamp
        updatedAt: FieldValue | Timestamp
      }

      interface FriendRequest {
        type: 'receive' | 'send'
      }
    }

    namespace P {
      type RoomMember = CC.FS.RoomMember & CC.FS.PublicUserData

      interface Friend extends CC.FS.Friend {
        displayName: string
        photoURL: string
      }

      interface ChatMessage extends CC.FS.ChatMessage {
        id: string
      }

      interface PublicUserData extends CC.FS.PublicUserData {
        uid: string
      }

      interface ChatRoom extends CC.FS.ChatRoom {
        id: string
        channels: CC.P.RoomChannel[]
        members: Array<CC.P.PublicUserData & CC.P.RoomMember>
        listeners: Array<() => void>
        destroy: () => void
      }

      interface RoomChannel extends CC.FS.RoomChannel {
        id: string
      }

      interface FriendRequest extends CC.FS.FriendRequest {
        uid: string
        displayName: string
        photoURL: string
      }

      interface SettingPage {
        label: string
        page: Component
      }

      interface MultiToolMenu {
        label: string
        click: () => void | Promise<void>
      }

      type RouteParams = Dictionary<string | undefined>

      interface PushSnackbarParams {
        text: string
        timeout?: number | undefined
        color?: 'info' | 'error' | 'warning' | 'success' | undefined
      }

      interface VForm extends Vue {
        validate: () => boolean
        resetValidation: () => boolean
        reset: () => void
      }
    }
    namespace F {
      // import * as admin from 'firebase-admin'
      // import { CODE } from '../const'

      interface Response<T = any>
        extends firebase.functions.HttpsCallableResult {
        data: CC.F.HttpCallableResultData<T>
      }
      interface HttpCallableResultData<T> {
        code: string
        payload: T
        error?: any
      }
      interface Friend {
        ref: FirebaseFirestore.DocumentReference
        dmId: string
        uid: string
      }
      type DocRef<T> = FirebaseFirestore.DocumentReference<T>
      type Code = keyof typeof CODE
      // type UserRecord = admin.auth.UserRecord
    }
  }
  interface WindowEventMap {
    'cc-close-contextmenu': CustomEvent<string>
  }
}
