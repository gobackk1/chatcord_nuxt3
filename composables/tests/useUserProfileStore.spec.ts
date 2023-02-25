import useUserProfileStore from '@/composables/useUserProfileStore'

const USER_RECORD = {
  uid: 'test',
  displayName: 'test user',
  photoURL: '/path/to/image.png',
}

describe('useUserProfileStoreのテスト', async () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('Actions', () => {
    describe('setUserData', () => {
      it('ユーザーデータを入力した場合、state.userDataが入力値になること', () => {
        const { state, actions } = useUserProfileStore()
        actions.setUserData(USER_RECORD)
        expect(state.userData).toStrictEqual(USER_RECORD)
        expect(state).toMatchSnapshot()
      })
      it('nullを入力した場合、state.userDataがnullになること', () => {
        const { state, actions } = useUserProfileStore()
        actions.setUserData(null)
        expect(state.userData).toBe(null)
        expect(state).toMatchSnapshot()
      })
    })
    describe('unsubscribeFriends', () => {
      it('購読解除用のメソッドを実行すること', () => {
        const { state, actions } = useUserProfileStore()
        const mock = vi.fn()
        state.unsubscribeFriends = mock
        actions.unsubscribeFriends()
        expect(mock).toHaveBeenCalledTimes(1)
        expect(state).toMatchSnapshot()
      })
    })
    describe('unsubscribeFriendRequests', () => {
      it('購読解除用のメソッドを実行すること', () => {
        const { state, actions } = useUserProfileStore()
        const mock = vi.fn()
        state.unsubscribeFriendRequests = mock
        actions.unsubscribeFriendRequests()
        expect(mock).toHaveBeenCalledTimes(1)
        expect(state).toMatchSnapshot()
      })
    })
    describe('initializeStore', () => {
      it('storeデータを初期化すること', () => {
        const { state, actions } = useUserProfileStore()
        const mockUnsubscribeFriends = vi.fn()
        const mockUnsubscribeFriendRequests = vi.fn()
        const fakeFriend = {
          ...USER_RECORD,
          dmId: 'test id',
        }
        const fakeFriendRequest = {
          ...USER_RECORD,
          type: 'send' as 'send' | 'receive',
        }
        state.userData = USER_RECORD
        state.friends = [fakeFriend]
        state.friendRequests = [fakeFriendRequest]
        state.unsubscribeFriends = mockUnsubscribeFriends
        state.unsubscribeFriendRequests = mockUnsubscribeFriendRequests

        actions.initializeStore()
        actions.unsubscribeFriends()
        actions.unsubscribeFriendRequests()
        expect(state.userData).toBe(null)
        expect(state.friends).toStrictEqual([])
        expect(state.friendRequests).toStrictEqual([])
        expect(state.unsubscribeFriends).toBe(null)
        expect(state.unsubscribeFriendRequests).toBe(null)
        expect(mockUnsubscribeFriends).toHaveBeenCalledTimes(1)
        expect(mockUnsubscribeFriendRequests).toHaveBeenCalledTimes(1)
        expect(state).toMatchSnapshot()
      })
    })
    describe.skip('fetchFriends')
    describe.skip('fetchFriendRequests')
  })
  describe('Getters', () => {
    describe('getFriendByUid', () => {
      it('入力したuidと同じuidを持つフレンドが存在する場合、フレンドのデータを返すこと', () => {
        const { state, getters } = useUserProfileStore()
        state.friends = [{ ...USER_RECORD, uid: 'frienduid', dmId: 'test id' }]
        const friend = getters.getFriendByUid('frienduid')
        expect(friend).toBeTruthy()
      })
      it('入力したuidと同じuidを持つフレンドが存在しない場合、nullを返すこと', () => {
        const { state, getters } = useUserProfileStore()
        state.friends = [{ ...USER_RECORD, uid: 'frienduid', dmId: 'test id' }]
        const friend = getters.getFriendByUid('nonexistentid')
        expect(friend).toBe(null)
      })
    })
  })
})
