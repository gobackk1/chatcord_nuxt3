import firebase from 'firebase'

interface Param {
  displayName?: string | undefined
  photoURL?: string | undefined
}

export const updateUserProfile = async ({
  displayName,
  photoURL,
}: Param): Promise<CC.F.Response<{ user: firebase.User }>> => {
  const response = await firebase
    .app()
    .functions('asia-northeast1')
    .httpsCallable('updateProfile')({ displayName, photoURL })

  return response
}
