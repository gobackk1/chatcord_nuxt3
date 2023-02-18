import firebase from 'firebase'

export const deleteUser = async (): Promise<CC.F.Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('deleteUser')()

  return response
}
