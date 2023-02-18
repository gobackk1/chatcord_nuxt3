export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  const userProfile = useUserProfileStore()
  // TODO: ユーザ情報の取得時間を計測し、必要ならキャッシュを導入する
  const user = await auth.getCurrentUser()
  await user?.reload()
  userProfile.actions.setUserData(user)

  if (user === null) {
    return await navigateTo({ name: 'login' })
  } else if (user.displayName === null && to.name !== 'preparation') {
    // Firebaseでは、メール認証でユーザーを作成するとき、作成時に設定できない情報がある。
    // よって、displayName等は登録後の画面で設定させる。
    return await navigateTo({ name: 'preparation' })
  } else if (user.displayName !== null && to.name === 'preparation') {
    return await navigateTo({ path: '/chat/me/friends' })
  }
})
