import EditTpl from 'src/pages/Settings/template'
import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Avatar from 'src/components/Avatar'
import Input from 'src/components/Input'
import { userPasswordFields } from 'src/data/pages/editPassword'
import { IUser } from 'src/api/AuthAPI'
import { connect } from 'src/core/Store/Connect'
import { isValid, validateField } from 'src/utils/validation'
import UserController from 'src/controllers/UserController'
import { handleRoute } from 'src/utils/router'
import { getPropsValue } from 'src/utils/helpers'

interface IProps {
  formId: string
  avatar: typeof Avatar
  button: Button
  fields: { [key: string]: Input }[]
  events: TEvent[]
}

class Password extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, EditTpl)
  }

  init() {
    const self = this
    const formId = 'edit-pass'

    const avatar = new Avatar({})

    const button = new Button({
      type: 'submit',
      children: 'Сохранить',
    })

    const fields = userPasswordFields

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
      {
        tag: 'img',
        name: 'click',
        callback: (event: Event) => {
          const target = event.target as HTMLDivElement

          if (!target || target.id !== 'chats') return

          handleRoute('chats')
        },
      },
    ]

    this.setProps({ formId, avatar, button, fields, events })
  }

  async onSubmit(event: Event) {
    event.preventDefault()

    const form = event.target as HTMLFormElement

    if (!form) return

    const fields = Array.from(form.querySelectorAll('input') || [])

    fields.forEach((field) => {
      validateField.call(this, field, 'submit')
    })

    const oldPassword = fields.find(({ id }) => id === 'old_password')?.value ?? ''
    const newPassword = fields.find(({ id }) => id === 'new_password')?.value ?? ''
    const repeatPassword = fields.find(({ id }) => id === 'repeat_password')?.value ?? ''

    // Пароли не совпадают
    if (newPassword !== repeatPassword) return

    const isOldPasswordValid = isValid(oldPassword, 'password')
    const isNewPasswordValid = isValid(oldPassword, 'password')
    const isRepeatPasswordValid = isValid(oldPassword, 'password')

    if (isOldPasswordValid && isNewPasswordValid && isRepeatPasswordValid) {
      await UserController.updatePassword({ oldPassword, newPassword })
    }
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

  render() {
    return this.compile(EditTpl)
  }
}

const mapStateToProps = (state: IUser): IProps => {
  const props = {} as IProps

  props.fields = userPasswordFields.map((field) => {
    // eslint-disable-next-line no-underscore-dangle
    const { id, name, type, placeholder } = field.input._props

    return {
      input: new Input({
        // eslint-disable-next-line no-underscore-dangle
        ...field.input._props,
        id,
        name,
        type,
        placeholder,
        value: getPropsValue(state, id),
      }),
    }
  })

  return props
}

export default connect(Password, (state) => mapStateToProps(state.user ?? {}) ?? {})
