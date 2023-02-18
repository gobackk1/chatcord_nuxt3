import type firebase from 'firebase'

export interface SubscribeHandlers {
  added?: {
    handler: (doc: firebase.firestore.DocumentSnapshot) => void
  }
  modified?: {
    handler: (doc: firebase.firestore.DocumentSnapshot) => void
  }
  removed?: {
    handler: (doc: firebase.firestore.DocumentSnapshot) => void
  }
  // 初回のドキュメント読み込み完了をフックする
  completed?: {
    handler: () => void
  }
  catch?: (error: firebase.firestore.FirestoreError) => void | never
}
