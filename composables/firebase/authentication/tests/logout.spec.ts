import { logout } from '../logout'
import firebase from 'firebase'

describe('logout', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it.concurrent('ログアウトすること', async () => {
    const spySignOut = vi.fn()
    vi.spyOn(firebase as any, 'auth').mockImplementation(() => {
      return {
        signOut: spySignOut,
      }
    })

    await logout()
    expect(spySignOut).toBeCalledTimes(1)
  })
})
