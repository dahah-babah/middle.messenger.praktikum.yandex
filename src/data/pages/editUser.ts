import Input from '@/components/Input'

export const userSettingsFields = [
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
      name: 'login',
      label: 'Логин',
      value: '',
      type: 'text',
      placeholder: 'Логин',
    }),
  },
  {
    input: new Input({
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      value: '',
      type: 'text',
      placeholder: 'Имя',
    }),
  },
  {
    input: new Input({
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      value: '',
      type: 'text',
      placeholder: 'Фамилия',
    }),
  },
  {
    input: new Input({
      id: 'display_name',
      name: 'display_name',
      label: 'Имя в чате',
      value: '',
      type: 'text',
      placeholder: 'Имя в чате',
    }),
  },
  {
    input: new Input({
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      value: '',
      type: 'phone',
      placeholder: 'Телефон',
    }),
  },
]
