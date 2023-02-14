import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { routerEvents, validationEvents } from 'src/data/events'

export const editPasswordData = {
  formId: 'edit-pass',
  avatar: new Avatar(),
  button: new Button({
    type: 'submit',
    children: 'Сохранить',
  }),
  fields: [
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
  ],
  events: [...validationEvents, ...routerEvents],
}
