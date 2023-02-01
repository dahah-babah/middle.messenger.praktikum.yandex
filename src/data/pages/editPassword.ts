import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { TInputType } from '@/components/Input'
import { validationEvents } from '@/data/events'

export const editPasswordData = {
  formId: 'edit-pass',
  avatar: new Avatar(),
  button: new Button({
    type: 'submit',
    children: 'Сохранить',
  }),
  fields: [
    {
      name: 'oldPassword',
      label: 'Старый пароль',
      value: 'ivanivanov',
      type: 'password' as TInputType,
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
      value: 'ivanivanov123',
      type: 'password' as TInputType,
    },
    {
      name: 'repeatPassword',
      label: 'Повторите новый пароль',
      value: 'ivanivanov123',
      type: 'password' as TInputType,
    },
  ],
  events: validationEvents,
}
