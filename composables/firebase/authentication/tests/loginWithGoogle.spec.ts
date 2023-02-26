import { loginWithGoogle } from '../loginWithGoogle'

describe('loginWithGoogle', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it.concurrent('Googleログインページへリダイレクトすること', async () => {
    vi.mock('firebase', async () => {
      const spySignInWithRedirect = vi.fn()
      const auth = function () {
        return {
          signInWithRedirect: spySignInWithRedirect,
        }
      }
      auth.GoogleAuthProvider = function () {
        const fakeProvider = {
          spySignInWithRedirect,
        }
        return fakeProvider
      }
      const firebase: any = await vi.importActual('firebase')
      return {
        default: {
          ...firebase,
          auth,
        },
      }
    })

    const fakeProvider: any = await loginWithGoogle()
    expect(fakeProvider.spySignInWithRedirect).toBeCalledTimes(1)
    expect(fakeProvider.spySignInWithRedirect).toBeCalledWith({
      spySignInWithRedirect: fakeProvider.spySignInWithRedirect,
    })
  })
})
