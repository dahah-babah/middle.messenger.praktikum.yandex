import { ErrorPage404, ErrorPage500 } from '@/pages/Error'
import { SignInPage } from '@/pages/Auth'

type TRouter = {
    path: string
    component: any
}
const routes: TRouter[] = [
    { path: '/sign-in', component: SignInPage },
    // { path: '/sign-up', component: Core.compile(Auth, mock.signUp) },
    // { path: '/profile', component: Core.compile(Profile, mock.profile) },
    // { path: '/edit', component: Core.compile(Edit, mock.edit) },
    // { path: '/password', component: Core.compile(Edit, mock.password) },
    // { path: '/chats', component: Core.compile(Chats, mock.chats) },
    { path: '/500', component: ErrorPage500 },
    { path: '/404', component: ErrorPage404 },
]

const currentComponent = () =>
    routes.find((route) => route.path.match(`\\${window.location.pathname}`))

export default SignInPage
// export default currentComponent()?.component ?? ErrorPage404
