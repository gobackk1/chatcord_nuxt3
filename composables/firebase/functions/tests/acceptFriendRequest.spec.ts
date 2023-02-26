import { acceptFriendRequest } from '../acceptFriendRequest'
import firebase from 'firebase'

describe('acceptFriendRequest', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  it('呼出可能なクラウド関数を実行し、レスポンスを返すこと', async () => {
    const spyAcceptFriendRequest = vi.fn().mockReturnValue('fake response')
    const spyHttpsCallable = vi.fn().mockImplementation(() => {
      return spyAcceptFriendRequest
    })
    const spyFunctions = vi.fn().mockImplementation(() => {
      return {
        httpsCallable: spyHttpsCallable,
      }
    })
    vi.spyOn(firebase as any, 'app').mockImplementation(() => {
      return {
        functions: spyFunctions,
      }
    })

    const response = await acceptFriendRequest('fake receiver user id')
    expect(spyAcceptFriendRequest).toBeCalledTimes(1)
    expect(spyAcceptFriendRequest).toBeCalledWith({
      receiverUid: 'fake receiver user id',
    })
    expect(spyFunctions).toBeCalledTimes(1)
    expect(spyFunctions).toBeCalledWith('asia-northeast1')
    expect(spyHttpsCallable).toBeCalledTimes(1)
    expect(spyHttpsCallable).toBeCalledWith('acceptFriendRequest')
    expect(response).toBe('fake response')
  })
})
