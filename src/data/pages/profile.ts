import Avatar from 'src/components/Avatar'
import { TInputType } from 'src/components/Input'
import Link from 'src/components/Link'

export const profilePageData = {
  title: 'Иван',
  avatar: new Avatar(),
  fields: [
    {
      name: 'email',
      label: 'Почта',
      value: 'pochta@yandex.ru',
      type: 'email' as TInputType,
    },
    {
      name: 'login',
      label: 'Логин',
      value: 'ivanivanov',
      type: 'text' as TInputType,
    },
    {
      name: 'first_name',
      label: 'Имя',
      value: 'Иван',
      type: 'text' as TInputType,
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
      type: 'text' as TInputType,
    },
    {
      name: 'display_name',
      label: 'Имя в чате',
      value: 'Иванushka',
      type: 'text' as TInputType,
    },
    {
      name: 'phone',
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
      type: 'phone' as TInputType,
    },
  ],
  changeDataLink: new Link({
    href: '/edit',
    children: 'Изменить данные',
  }),
  changePasswordLink: new Link({
    href: '/password',
    children: 'Изменить пароль',
  }),
  exitLink: new Link({
    href: '/sign-in',
    children: 'Выйти',
  }),
}
