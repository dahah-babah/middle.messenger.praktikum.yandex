import Router from 'src/core/Router/Router'

import Auth from 'src/pages/Auth'
import Chats from 'src/pages/Chats'
import Settings from 'src/pages/Settings'
import Error from 'src/pages/Error'
import Profile from 'src/pages/Profile'

import { signInPageData } from 'src/data/pages/signIn'
import { signUpPageData } from 'src/data/pages/signUp'
import { chatsPageData } from 'src/data/pages/chats'
import { editUserData } from 'src/data/pages/editUser'
import { editPasswordData } from 'src/data/pages/editPassword'
import { profilePageData } from 'src/data/pages/profile'
import { errorPageData404 } from 'src/data/pages/error'

export const router = new Router('#root')

export enum ROUTES {
  SIGN_IN = '/',
  SIGN_UP = '/sign-up',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  MESSENGER = '/messenger',
  NOT_FOUND = '/404',
}

// const isAuth = false

// if (isAuth) {
//   router
//   .use('/', SignInPage)
//   .use('/sign-up', SignUpPage)
//   .use('/settings', EditUserPage)
//   .use('/messenger', ChatsPage)
//   .start()
// } else {
//   router.use('/', Auth, signInPageData).use('/sign-up', Auth, signUpPageData).start()
// }

router
  .use(ROUTES.SIGN_IN, Auth, signInPageData)
  .use(ROUTES.SIGN_UP, Auth, signUpPageData)
  .use(ROUTES.PROFILE, Profile, profilePageData)
  .use(ROUTES.SETTINGS, Settings, editUserData) // settings
  .use(ROUTES.SETTINGS, Settings, editPasswordData) // settings
  .use(ROUTES.MESSENGER, Chats, chatsPageData)
  .use(ROUTES.NOT_FOUND, Error, errorPageData404) // 500
  .start()
