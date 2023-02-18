import firebase from 'firebase'

export const acceptFriendRequest = async (
  receiverUid: string
): Promise<CC.F.Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('acceptFriendRequest')({ receiverUid })

  return response
}
