import { reactive } from 'vue'
import type firebase from 'firebase'
// import * as firestore from '@/plugins/firebase/firestore'
// import * as functions from '@/plugins/firebase/functions'

export interface UserProfileStore {
  state: UserProfileState
  getters: UserProfileGetters
  actions: UserProfileActions
}

export interface UserProfileState {
  userData: firebase.User | null
  friends: CC.P.Friend[]
  unsubscribeFriends: null | firebase.Unsubscribe
  friendRequests: CC.P.FriendRequest[]
  unsubscribeFriendRequests: null | firebase.Unsubscribe
}

export interface UserProfileGetters {
  getFriendByUid: (uid: string) => CC.P.Friend | null
}

export interface UserProfileActions {
  setUserData: (user: firebase.User | null) => void
  fetchFriends: (uid: string) => Promise<void>
  unsubscribeFriends: () => void
  fetchFriendRequests: (uid: string) => Promise<void>
  unsubscribeFriendRequests: () => void
  initializeStore: () => void
}

const { firestore, functions } = useFirebase()

const store: UserProfileStore = reactive<UserProfileStore>({
  state: {
    userData: null,
    friends: [],
    friendRequests: [],
    unsubscribeFriends: null,
    unsubscribeFriendRequests: null,
  },
  getters: {
    getFriendByUid(uid): CC.P.Friend | null {
      const target = store.state.friends.find((friend) => friend.uid === uid)
      return target === undefined ? null : target
    },
  },
  actions: {
    initializeStore() {
      store.state.userData = null

      store.state.friends = []

      store.state.friendRequests = []

      store.state.unsubscribeFriends?.()
      store.state.unsubscribeFriends = null

      store.state.unsubscribeFriendRequests?.()
      store.state.unsubscribeFriendRequests = null
    },
    setUserData(user) {
      store.state.userData = user
    },
    async fetchFriends(uid) {
      store.state.unsubscribeFriends = await firestore.fetchFriends({
        uid,
        handlers: {
          added: {
            handler: async (doc) => {
              const response = await functions.getUserByUid(doc.id)
              const { displayName, photoURL } = response.data.payload

              store.state.friends.push({
                displayName: displayName === null ? '' : displayName,
                photoURL: photoURL === null ? '' : photoURL,
                ...(doc.data() as CC.FS.Friend),
              })
            },
          },
          removed: {
            handler: (doc) => {
              const filteredFriends = store.state.friends.filter(
                (friend) => friend.uid !== doc.id
              )
              store.state.friends = filteredFriends
            },
          },
          completed: {
            handler: () => {
              // resolve()
              // return
            },
          },
        },
      })
    },
    unsubscribeFriends() {
      store.state.unsubscribeFriends?.()
    },
    async fetchFriendRequests(uid: string) {
      store.state.unsubscribeFriendRequests =
        await firestore.fetchFriendRequests({
          uid,
          handlers: {
            added: {
              handler: async (doc) => {
                const response = await functions.getUserByUid(doc.id)
                const { displayName, photoURL, uid } = response.data.payload
                store.state.friendRequests.push({
                  displayName: displayName === null ? '' : displayName,
                  photoURL: photoURL === null ? '' : photoURL,
                  uid,
                  ...(doc.data() as CC.FS.FriendRequest),
                })
              },
            },
            removed: {
              handler: (doc) => {
                const filteredFriendRequests =
                  store.state.friendRequests.filter(
                    (request) => request.uid !== doc.id
                  )
                store.state.friendRequests = filteredFriendRequests
              },
            },
            completed: {
              handler: () => {
                // resolve(unsubscribe)
              },
            },
          },
        })
    },
    unsubscribeFriendRequests() {
      store.state.unsubscribeFriendRequests?.()
    },
  },
})

export default function (): UserProfileStore {
  return store
}
