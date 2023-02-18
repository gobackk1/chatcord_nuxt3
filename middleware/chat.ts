export default defineNuxtRouteMiddleware(async (to, from) => {
  const whiteList = /(chat-me-friends|chat-me-pending|chat-me-id)/
  if (typeof to.name === 'string') {
    if (to.name.match(whiteList) === null) {
      return await navigateTo('/chat/me/friends')
    }
  } else {
    throw new Error('this route is not applicable')
  }
})
