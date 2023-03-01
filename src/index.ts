import Router, { ROUTES } from '@/core/Router/Router'
import AuthController from '@/controllers/AuthController'
import ChatsController from '@/controllers/ChatsController'
import SignIn from '@/pages/Auth/SignIn'
import SignUp from '@/pages/Auth/SignUp'
import NotFound from '@/pages/Error/NotFound'
import ServerError from '@/pages/Error/ServerError'
import User from '@/pages/Settings/User'
import Password from '@/pages/Settings/Password'
import Chats from '@/pages/Chats'
import Profile from '@/pages/Profile'

import '@/styles/normalize.less'

const pageNotFound = !(Object.values(ROUTES) as string[]).includes(window.location.pathname)
const protectedRoutes = [ROUTES.PROFILE, ROUTES.SETTINGS, ROUTES.PASSWORD, ROUTES.MESSENGER]

const isProtectedRoute = (Object.values(protectedRoutes) as string[]).includes(
  window.location.pathname,
)

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(ROUTES.SIGN_IN, SignIn)
    .use(ROUTES.SIGN_UP, SignUp)
    .use(ROUTES.SETTINGS, User)
    .use(ROUTES.PASSWORD, Password)
    .use(ROUTES.NOT_FOUND, NotFound)
    .use(ROUTES.SERVER_ERROR, ServerError)
    .use(ROUTES.MESSENGER, Chats)
    .use(ROUTES.PROFILE, Profile)

  try {
    await AuthController.fetchUser()
    await ChatsController.fetchChats()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(ROUTES.MESSENGER)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(ROUTES.SIGN_IN)
    }
  } finally {
    if (pageNotFound) {
      Router.go(ROUTES.NOT_FOUND)
    }
  }
})
