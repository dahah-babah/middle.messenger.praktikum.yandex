import AuthTpl from '@/pages/Auth/template'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Component from '@/core/Component'
import Input from '@/components/Input'

interface IProps {
    title: string
    link: Link
    button: Button
    fields: { [key: string]: Input }[]
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

const signUpPageData = {
    title: 'Регистрация',
    fields: [
        {
            input: new Input({
                id: 'email',
                type: 'email',
                name: 'email',
                label: 'Почта',
                value: 'pochta@yandex.ru',
                placeholder: 'Почта',
            }),
        },
        {
            input: new Input({
                id: 'login',
                type: 'text',
                name: 'login',
                label: 'Логин',
                value: 'ivanivanov',
                placeholder: 'Логин',
            }),
        },
        {
            input: new Input({
                id: 'first_name',
                type: 'text',
                name: 'first_name',
                label: 'Имя',
                value: 'Иван',
                placeholder: 'Имя',
            }),
        },
        {
            input: new Input({
                id: 'second_name',
                type: 'text',
                name: 'second_name',
                label: 'Фамилия',
                value: 'Иванов',
                placeholder: 'Фамилия',
            }),
        },
        {
            input: new Input({
                id: 'phone',
                type: 'phone',
                name: 'phone',
                label: 'Телефон',
                value: '+7 (909) 967 30 30',
                placeholder: 'Телефон',
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
        {
            input: new Input({
                id: 'password_again',
                type: 'password',
                name: 'password_again',
                label: 'Пароль (еще раз)',
                value: 'ivanivanov',
                placeholder: 'Пароль (еще раз)',
            }),
        },
    ],
    button: new Button({
        type: 'submit',
        children: 'Зарегистрироваться',
    }),
    link: new Link({
        href: '/sign-in',
        children: 'Войти',
    }),
}

const SignInPage = new Auth(signInPageData)
const SignUpPage = new Auth(signUpPageData)

export { SignInPage, SignUpPage }
