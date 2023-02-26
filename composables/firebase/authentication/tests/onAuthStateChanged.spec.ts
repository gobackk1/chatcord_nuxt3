import { onAuthStateChanged } from '../onAuthStateChanged'
import firebase from 'firebase'

describe('onAuthStateChanged', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it.concurrent(
    'callbackをライブラリのAPIへ渡し、購読解除用の関数を返すこと',
    () => {
      const fakeUnsubscribe = vi.fn()
      const dummyCallback = vi.fn()
      const spyOnAuthStateChanged = vi.fn().mockReturnValue(fakeUnsubscribe)
      vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
        return {
          onAuthStateChanged: spyOnAuthStateChanged,
        }
      })
      const unsubscribe = onAuthStateChanged(dummyCallback)

      expect(unsubscribe).toBe(fakeUnsubscribe)
      expect(spyOnAuthStateChanged).toBeCalledTimes(1)
      expect(spyOnAuthStateChanged).toBeCalledWith(dummyCallback)
    }
  )
})
