import firebase from 'firebase'

type Response = CC.F.Response<{ receiverUid: string }>

export const requestToBecomeFriend = async (
  receiverUid: string
): Promise<Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('requestToBecomeFriend')({ receiverUid })

  return response
}
