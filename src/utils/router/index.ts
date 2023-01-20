import Core from '@/core'
import { mock } from '@/mock'
import Auth from '../../pages/Auth'
import Profile from '../../pages/Profile'
import Edit from '../../pages/Edit'
import Chats from '../../pages/Chats'
import Error from '../../pages/Error'

type TRouter = {
  path: string,
  component: any
}

const routes: TRouter[] = [
  { path: '/sign-in', component: Core.compile(Auth, mock.signIn) },
  { path: '/sign-up', component: Core.compile(Auth, mock.signUp) },
  { path: '/profile', component: Core.compile(Profile, mock.profile) },
  { path: '/edit', component: Core.compile(Edit, mock.edit) },
  { path: '/password', component: Core.compile(Edit, mock.password) },
  { path: '/chats', component: Core.compile(Chats, mock.chats) },
  { path: '/500', component: Core.compile(Error, mock['500']) },
  { path: '/404', component: Core.compile(Error, mock['404']) },
]

const currentComponent = () => routes.find((route) => route.path.match(`\\${window.location.pathname}`))

export const component = () => currentComponent()?.component ?? Core.compile(Error, mock['404'])
