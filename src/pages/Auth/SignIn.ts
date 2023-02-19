import { validateField } from 'src/utils/validation'
import AuthController from 'src/controllers/AuthController'
import { ISignIn } from 'src/api/AuthAPI'
import AuthTpl from 'src/pages/Auth/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import Input from 'src/components/Input'
import { validationEvents } from 'src/data/events'
import { handleRoute } from 'src/utils/router'
import { signInFields } from 'src/data/pages/auth'

interface IProps {
  formId: string
  title: string
  link: Link
  button: Button
  fields: { [key: string]: Input }[]
  events: TEvent[]
}

class SignIn extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, AuthTpl)
  }

  init() {
    const formId = 'sign-in'
    const title = 'Вход'

    const button = new Button({
      type: 'submit',
      children: 'Войти',
    })

    const link = new Link({
      id: 'sign-up',
      children: 'Нет аккаунта?',
      events: [
        {
          tag: 'div',
          name: 'click',
          callback: () => {
            handleRoute('sign-up')
          },
        },
      ],
    })

    const fields = signInFields
    const events = validationEvents

    this.setProps({ formId, title, fields, button, link, events })
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    const oldFields = oldProps.fields
    const newFields = newProps.fields

    let shouldUpdate = false

    if (!oldFields) return shouldUpdate

    oldFields.forEach((oldField, index) => {
      // eslint-disable-next-line no-underscore-dangle
      const oldInputProps = oldField.input._props
      // eslint-disable-next-line no-underscore-dangle
      const newInputProps = newFields[index].input._props

      if (oldInputProps.error !== newInputProps.error) {
        shouldUpdate = true
      }
    })

    return shouldUpdate
  }

  async onSubmit(event: Event) {
    event.preventDefault()

    const form = event.target as HTMLFormElement

    if (!form) return

    const fields = Array.from(form.querySelectorAll('input') || [])

    fields.forEach((field) => {
      validateField.call(this, field, 'submit')
    })

    const data = fields.reduce((acc, { id, value }) => ({ ...acc, [id]: value }), {})

    await this.signIn(data as ISignIn)
  }

  async signIn(data: ISignIn) {
    await AuthController.signIn(data)
  }

  render() {
    return this.compile(AuthTpl)
  }
}

export default SignIn
