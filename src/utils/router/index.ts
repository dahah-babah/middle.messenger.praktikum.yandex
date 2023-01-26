import { ErrorPage404, ErrorPage500 } from '@/pages/Error'
import { SignInPage, SignUpPage } from '@/pages/Auth'
import { EditPasswordPage, EditUserPage } from '@/pages/Edit'
import { ProfilePage } from '@/pages/Profile'
import { ChatsPage } from '@/pages/Chats'

type TRouter = {
    path: string
    component: any
}
const routes: TRouter[] = [
    { path: '/sign-in', component: SignInPage },
    { path: '/sign-up', component: SignUpPage },
    { path: '/edit', component: EditUserPage },
    { path: '/password', component: EditPasswordPage },
    { path: '/500', component: ErrorPage500 },
    { path: '/404', component: ErrorPage404 },
    { path: '/profile', component: ProfilePage },
    { path: '/chats', component: ChatsPage },
]

const currentComponent = () =>
    routes.find((route) => route.path.match(`\\${window.location.pathname}`))

export default currentComponent()?.component ?? ErrorPage404
