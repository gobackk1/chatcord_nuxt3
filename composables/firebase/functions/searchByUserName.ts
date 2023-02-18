import firebase from 'firebase'

type Response = CC.F.Response<{ user: CC.P.PublicUserData }>

export const searchByUserName = async (
  userName: string,
  senderUid: string
): Promise<Response> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('searchByUserName')({ userName, senderUid })

  return response
}
