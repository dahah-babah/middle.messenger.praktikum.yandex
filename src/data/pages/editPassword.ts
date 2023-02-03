import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'
import { TInputType } from 'src/components/Input'
import { validationEvents } from 'src/data/events'

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
      value: '',
      type: 'password' as TInputType,
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
      value: '',
      type: 'password' as TInputType,
    },
    {
      name: 'repeatPassword',
      label: 'Повторите новый пароль',
      value: '',
      type: 'password' as TInputType,
    },
  ],
  events: validationEvents,
}
