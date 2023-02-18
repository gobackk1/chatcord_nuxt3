import firebase from 'firebase'

export const deleteFriend = async (uid: string): Promise<CC.F.Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('deleteFriend')({ uid })

  return response
}
