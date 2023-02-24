import { TInputType } from 'src/components/Input'

export const profileFields = [
  {
    name: 'email',
    label: 'Почта',
    value: '',
    type: 'email' as TInputType,
  },
  {
    name: 'login',
    label: 'Логин',
    value: '',
    type: 'text' as TInputType,
  },
  {
    name: 'first_name',
    label: 'Имя',
    value: '',
    type: 'text' as TInputType,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    value: '',
    type: 'text' as TInputType,
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    value: '',
    type: 'text' as TInputType,
  },
  {
    name: 'phone',
    label: 'Телефон',
    value: '',
    type: 'phone' as TInputType,
  },
]
