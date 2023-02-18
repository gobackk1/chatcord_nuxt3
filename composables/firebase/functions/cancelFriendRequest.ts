import firebase from 'firebase'

export const cancelFriendRequest = async (
  receiverUid: string
): Promise<CC.F.Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('cancelFriendRequest')({ receiverUid })

  return response
}
