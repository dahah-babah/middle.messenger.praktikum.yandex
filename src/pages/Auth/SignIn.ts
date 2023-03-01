import { validateField } from '@/utils/validation'
import AuthController from '@/controllers/AuthController'
import { ISignIn } from '@/api/AuthAPI'
import AuthTpl from '@/pages/Auth/template'
import Component, { TEvent } from '@/core/Component'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Input from '@/components/Input'
import { handleRoute } from '@/utils/router'
import { signInFields } from '@/data/pages/auth'

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
    const self = this
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

    const events = [
      {
        tag: 'input',
        name: 'focus',
        callback(event: Event) {
          const target = event.target as HTMLInputElement

          validateField.call(self, target, 'focus')
        },
      },
      {
        tag: 'input',
        name: 'blur',
        callback(event: Event) {
          const target = event.target as HTMLInputElement

          validateField.call(self, target, 'blur')
        },
      },
      {
        tag: 'form',
        name: 'submit',
        callback(event: Event) {
          self.onSubmit(event)
        },
      },
    ]

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
