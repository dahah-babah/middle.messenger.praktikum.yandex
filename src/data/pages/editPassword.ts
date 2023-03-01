import Input from '@/components/Input'

export const userPasswordFields = [
  {
    input: new Input({
      id: 'old_password',
      name: 'old_password',
      value: '',
      type: 'password',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
    }),
  },
  {
    input: new Input({
      id: 'new_password',
      name: 'new_password',
      placeholder: 'Новый пароль',
      label: 'Новый пароль',
      value: '',
      type: 'password',
    }),
  },
  {
    input: new Input({
      id: 'repeat_password',
      name: 'repeat_password',
      label: 'Повторите новый пароль',
      placeholder: 'Повторите новый пароль',
      value: '',
      type: 'password',
    }),
  },
]
