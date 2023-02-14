import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import { routerEvents, validationEvents } from 'src/data/events'

export const signUpPageData = {
  formId: 'sign-up',
  title: 'Регистрация',
  fields: [
    {
      input: new Input({
        id: 'email',
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: '',
        placeholder: 'Почта',
      }),
    },
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
        id: 'first_name',
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: '',
        placeholder: 'Имя',
      }),
    },
    {
      input: new Input({
        id: 'second_name',
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: '',
        placeholder: 'Фамилия',
      }),
    },
    {
      input: new Input({
        id: 'phone',
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: '',
        placeholder: 'Телефон',
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
    {
      input: new Input({
        id: 'password_again',
        type: 'password',
        name: 'password_again',
        label: 'Пароль (еще раз)',
        value: '',
        placeholder: 'Пароль (еще раз)',
      }),
    },
  ],
  button: new Button({
    type: 'submit',
    children: 'Зарегистрироваться',
  }),
  link: new Link({
    id: 'sign-in',
    children: 'Войти',
  }),
  events: [...validationEvents, ...routerEvents],
}
