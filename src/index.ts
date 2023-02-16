import Router, { ROUTES } from 'src/core/Router/Router'
import AuthController from 'src/controllers/AuthController'

import SignIn from 'src/pages/Auth/SignIn'
import SignUp from 'src/pages/Auth/SignUp'
import Chats from 'src/pages/Chats'
import Settings from 'src/pages/Settings'
import Error from 'src/pages/Error'
import Profile from 'src/pages/Profile'

const protectedRoutes = [ROUTES.PROFILE, ROUTES.SETTINGS, ROUTES.PASSWORD, ROUTES.MESSENGER]

const isProtectedRoute = (Object.values(protectedRoutes) as string[]).includes(
  window.location.pathname,
)

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(ROUTES.SIGN_IN, SignIn)
    .use(ROUTES.SIGN_UP, SignUp)
    .use(ROUTES.PROFILE, Profile)
    .use(ROUTES.SETTINGS, Settings)
    .use(ROUTES.PASSWORD, Settings)
    .use(ROUTES.MESSENGER, Chats)
    .use(ROUTES.NOT_FOUND, Error)
    .use(ROUTES.SERVER_ERROR, Error)

  try {
    await AuthController.fetchUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(ROUTES.PROFILE)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(ROUTES.SIGN_IN)
    }
  }
})
