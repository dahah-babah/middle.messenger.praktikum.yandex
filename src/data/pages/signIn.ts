import Input from '@/components/Input'
import Button from '@/components/Button'
import Link from '@/components/Link'
import { validationEvents } from '@/data/events'

export const signInPageData = {
  formId: 'sign-in',
  title: 'Вход',
  fields: [
    {
      input: new Input({
        id: 'login',
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
        placeholder: 'Логин',
      }),
    },
    {
      input: new Input({
        id: 'password',
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: '',
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
  events: validationEvents,
}
