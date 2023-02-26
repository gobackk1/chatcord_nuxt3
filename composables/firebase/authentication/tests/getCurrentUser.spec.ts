import { getCurrentUser } from '../getCurrentUser'
import firebase from 'firebase'

describe('getCurrentUser', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('ログインしていない場合', async () => {
    it.concurrent('nullを返し、認証状態の購読を解除すること', async () => {
      const mockUnsubscribe = vi.fn()
      vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
        return {
          onAuthStateChanged(callback: any) {
            setTimeout(() => {
              callback(null)
            }, 1000)
            return mockUnsubscribe
          },
        }
      })
      const user = await getCurrentUser()
      expect(user).toStrictEqual(null)
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
    })
  })
  describe('ログインしている場合', () => {
    it.concurrent(
      'ユーザーデータを返し、認証状態の購読を解除すること',
      async () => {
        const mockUnsubscribe = vi.fn()
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            onAuthStateChanged(callback: any) {
              setTimeout(() => {
                callback({ uid: 'test id' })
              }, 1000)
              return mockUnsubscribe
            },
          }
        })
        const fakeUser = await getCurrentUser()
        expect(fakeUser).toStrictEqual({ uid: 'test id' })
        expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
      }
    )
  })
  describe('rejectする場合', () => {
    it.concurrent('firebase errorを返すこと', async () => {
      const mockUnsubscribe = vi.fn()
      vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
        return {
          onAuthStateChanged(callback: any, reject: any) {
            setTimeout(() => {
              reject('fake firebase error')
            }, 1000)
            return mockUnsubscribe
          },
        }
      })
      try {
        await getCurrentUser()
      } catch (error) {
        expect(error).toStrictEqual('fake firebase error')
      }
    })
  })
})
