import firebase from 'firebase'
import { SubscribeHandlers } from './types'

export const realtimeListener = (
  query: firebase.firestore.Query,
  handlers: SubscribeHandlers
): Promise<firebase.Unsubscribe> => {
  return new Promise((resolve) => {
    let counter = 0
    let initialized = false
    const unsubscribe = query.onSnapshot(
      async (snapshot) => {
        // NOTE: 購読開始時に、対象のドキュメントがない場合は初期化する
        if (snapshot.empty && !initialized) {
          await initialize(resolve, unsubscribe)
        }

        await Promise.all(
          snapshot.docChanges().map(async (change) => {
            if (change.type === 'added') {
              await handlers.added?.handler(change.doc)

              // NOTE: 購読開始時に、対象のドキュメントがある場合は、
              // ドキュメントの数だけaddedハンドラを実行してから初期化する
              if (!initialized) {
                counter++
                if (counter === snapshot.size) {
                  await initialize(resolve, unsubscribe)
                }
              }
            }
            if (change.type === 'modified') {
              await handlers.modified?.handler(change.doc)
            }
            if (change.type === 'removed') {
              await handlers.removed?.handler(change.doc)
            }
          })
        )
      },
      (error) => handlers.catch?.(error)
    )
    async function initialize(
      resolve: (unsubscribe: firebase.Unsubscribe) => void,
      unsubscribe: firebase.Unsubscribe
    ) {
      initialized = true
      await handlers.completed?.handler()
      resolve(unsubscribe)
    }
  })
}
