import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import { TInputType } from '@/components/Input'
import { validationEvents } from '@/data/events'

export const editUserData = {
  formId: 'edit-user',
  avatar: new Avatar(),
  button: new Button({
    type: 'submit',
    children: 'Сохранить',
  }),
  fields: [
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
  ],
  events: validationEvents,
}