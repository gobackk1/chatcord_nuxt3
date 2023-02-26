import { loginWithEmailAndPassword } from '../loginWithEmailAndPassword'
import firebase from 'firebase'
import { type FirebaseError } from '../../utils/isFirebaseError'

describe('loginWithEmailAndPassword', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('ログインに成功した場合', () => {
    it.concurrent('undefinedを返すこと', async () => {
      const spy = vi.fn()
      vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
        return {
          signInWithEmailAndPassword: spy,
        }
      })

      const result = await loginWithEmailAndPassword(
        'test_user@example.com',
        'password'
      )
      expect(result).toBe(undefined)
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith('test_user@example.com', 'password')
    })
  })
  describe('ログインに失敗した場合', () => {
    describe('firebaseのエラーの場合', () => {
      it('IDまたはパスワードが正しくない場合、「IDかパスワードが間違っています。」を返すこと', async () => {
        const spy = vi.fn().mockImplementation(() => {
          const error = new Error() as FirebaseError
          error.code = 'auth/wrong-password'
          throw error
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            signInWithEmailAndPassword: spy,
          }
        })

        const result = await loginWithEmailAndPassword(
          'test_user@example.com',
          'password'
        )
        expect(result).toBe('IDかパスワードが間違っています。')
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith('test_user@example.com', 'password')
      })
      it('入力したIDとパスワードでユーザーが見つからない場合、「ユーザーが見つかりませんでした。」を返すこと', async () => {
        const spy = vi.fn().mockImplementation(() => {
          const error = new Error() as FirebaseError
          error.code = 'auth/user-not-found'
          throw error
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            signInWithEmailAndPassword: spy,
          }
        })

        const result = await loginWithEmailAndPassword(
          'test_user@example.com',
          'password'
        )
        expect(result).toBe('ユーザーが見つかりませんでした。')
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith('test_user@example.com', 'password')
      })
    })
    describe('エラーインスタンスでない場合', () => {
      it('エラーオブジェクトを投げること', async () => {
        const spy = vi.fn().mockImplementation(() => {
          throw 'fake error object'
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            signInWithEmailAndPassword: spy,
          }
        })

        try {
          await loginWithEmailAndPassword('test_user@example.com', 'password')
        } catch (error) {
          expect(error).toBe('fake error object')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('test_user@example.com', 'password')
        }
      })
    })
    describe('FirebaseErrorではない場合', () => {
      it('エラーオブジェクトを投げること', async () => {
        const spy = vi.fn().mockImplementation(() => {
          throw new Error('fake error object')
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            signInWithEmailAndPassword: spy,
          }
        })

        try {
          await loginWithEmailAndPassword('test_user@example.com', 'password')
        } catch (error: any) {
          expect(error instanceof Error).toBe(true)
          expect(error.message).toBe('fake error object')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('test_user@example.com', 'password')
        }
      })
    })
    describe('対応するFirebaseErrorコードがない場合', () => {
      it('エラーオブジェクトを投げること', async () => {
        const spy = vi.fn().mockImplementation(() => {
          const error = new Error('fake error object') as any
          error.code = 'not registered in application'
          throw error
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            signInWithEmailAndPassword: spy,
          }
        })

        try {
          await loginWithEmailAndPassword('test_user@example.com', 'password')
        } catch (error: any) {
          expect(error.code).toBe('not registered in application')
          expect(error.message).toBe('fake error object')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('test_user@example.com', 'password')
        }
      })
    })
  })
})
