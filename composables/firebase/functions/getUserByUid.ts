import firebase from 'firebase'

export const getUserByUid = async (
  uid: string
): Promise<CC.F.Response<firebase.User>> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('getUserByUid')({ uid })

  return response
}
