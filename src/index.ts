import Router, { ROUTES } from 'src/core/Router/Router'
import AuthController from 'src/controllers/AuthController'
import ChatsController from 'src/controllers/ChatsController'

import SignIn from 'src/pages/Auth/SignIn'
import SignUp from 'src/pages/Auth/SignUp'
import NotFound from 'src/pages/Error/NotFound'
import ServerError from 'src/pages/Error/ServerError'
import User from 'src/pages/Settings/User'
import Password from 'src/pages/Settings/Password'
import Chats from 'src/pages/Chats'
import Profile from 'src/pages/Profile'

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
