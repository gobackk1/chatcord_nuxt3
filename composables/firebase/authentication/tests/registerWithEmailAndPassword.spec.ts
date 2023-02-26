import { registerWithEmailAndPassword } from '../registerWithEmailAndPassword'
import firebase from 'firebase'
import { type FirebaseError } from '../../utils/isFirebaseError'

describe('registerWithEmailAndPassword', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('登録に成功した場合', () => {
    it.concurrent('undefinedを返すこと', async () => {
      const spy = vi.fn()
      vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
        return {
          createUserWithEmailAndPassword: spy,
        }
      })

      const result = await registerWithEmailAndPassword(
        'test_user@example.com',
        'password'
      )
      expect(result).toBe(undefined)
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith('test_user@example.com', 'password')
    })
  })
  describe('登録に失敗した場合', () => {
    describe('エラーインスタンスでない場合', () => {
      it('エラーオブジェクトを投げること', async () => {
        const spy = vi.fn().mockImplementation(() => {
          throw 'fake error object'
        })
        vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
          return {
            createUserWithEmailAndPassword: spy,
          }
        })

        try {
          await registerWithEmailAndPassword(
            'test_user@example.com',
            'password'
          )
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
            createUserWithEmailAndPassword: spy,
          }
        })

        try {
          await registerWithEmailAndPassword(
            'test_user@example.com',
            'password'
          )
        } catch (error: any) {
          expect(error instanceof Error).toBe(true)
          expect(error.message).toBe('fake error object')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('test_user@example.com', 'password')
        }
      })
    })
    describe('FirebaseErrorの場合', () => {
      describe('例外処理すると決めたエラーコードの場合', () => {
        it('firebaseが受け付けないメールアドレスを入力した場合、「無効なメールアドレスです。」を返すこと', async () => {
          const spy = vi.fn().mockImplementation(() => {
            const error = new Error() as FirebaseError
            error.code = 'auth/invalid-email'
            throw error
          })
          vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
            return {
              createUserWithEmailAndPassword: spy,
            }
          })

          const result = await registerWithEmailAndPassword(
            'invalid-email',
            'password'
          )
          expect(result).toBe('無効なメールアドレスです。')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('invalid-email', 'password')
        })
        it('入力したメールアドレスが既に登録されている場合、「このメールアドレスは既に登録されています。」を返すこと', async () => {
          const spy = vi.fn().mockImplementation(() => {
            const error = new Error() as FirebaseError
            error.code = 'auth/email-already-in-use'
            throw error
          })
          vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
            return {
              createUserWithEmailAndPassword: spy,
            }
          })

          const result = await registerWithEmailAndPassword(
            'test_user@example.com',
            'password'
          )
          expect(result).toBe('このメールアドレスは既に登録されています。')
          expect(spy).toBeCalledTimes(1)
          expect(spy).toBeCalledWith('test_user@example.com', 'password')
        })
      })
      describe('例外処理しないエラーコードの場合', () => {
        it('エラーオブジェクトを投げること', async () => {
          const spy = vi.fn().mockImplementation(() => {
            const error = new Error('fake error object') as any
            error.code = 'not registered in application'
            throw error
          })
          vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
            return {
              createUserWithEmailAndPassword: spy,
            }
          })

          try {
            await registerWithEmailAndPassword(
              'test_user@example.com',
              'password'
            )
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
})
