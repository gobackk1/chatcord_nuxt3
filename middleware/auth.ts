export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  let user

  try {
    const userProfile = useUserProfileStore()
    // TODO: ユーザ情報の取得時間を計測し、必要ならキャッシュを導入する
    user = await auth.getCurrentUser()
    await user?.reload()
    userProfile.actions.setUserData(user)
  } catch (error) {
    // NOTE: firebase関連のエラーはログイン画面に返す
    // TODO: UI上で何かフィードバックを返す。
    return await navigateTo({ name: 'login' })
  }

  if (user === null || user === undefined) {
    return await navigateTo({ name: 'login' })
  } else if (user.displayName === null && to.name !== 'preparation') {
    // Firebaseでは、メール認証でユーザーを作成するとき、作成時に設定できない情報がある。
    // よって、displayName等は登録後の画面で設定させる。
    return await navigateTo({ name: 'preparation' })
  } else if (user.displayName !== null && to.name === 'preparation') {
    return await navigateTo({ path: '/chat/me/friends' })
  }
})
