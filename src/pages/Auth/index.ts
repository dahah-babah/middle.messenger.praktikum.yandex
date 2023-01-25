import AuthTpl from '@/pages/Auth/template'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Component from '@/core/Component'
import Input from '@/components/Input'

interface IProps {
    title: string
    button: Button
    link: Link
}

class Auth extends Component<IProps> {
    constructor(props: IProps) {
        super('section', props, AuthTpl)
    }

    render() {
        return this.compile(AuthTpl)
    }
}

const signInPageData = {
    title: 'Вход',
    fields: [
        {
            input: new Input({
                id: 'login',
                type: 'email',
                name: 'email',
                label: 'Логин',
                value: 'ivanivanov',
                placeholder: 'Логин',
            }),
        },
        {
            input: new Input({
                id: 'password',
                type: 'password',
                name: 'password',
                label: 'Пароль',
                value: 'ivanivanov',
                placeholder: 'Пароль',
            }),
        },
    ],
    button: new Button({
        type: 'submit',
        children: 'Войти',
    }),
    link: new Link({
        href: '/sign-up',
        children: 'Нет аккаунта?',
    }),
}

const SignInPage = new Auth(signInPageData)

export { SignInPage }
