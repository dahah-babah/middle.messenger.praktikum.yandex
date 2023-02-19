import EditTpl from 'src/pages/Settings/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Avatar from 'src/components/Avatar'
import Input from 'src/components/Input'
import { validationEvents } from 'src/data/events'
import { userSettingsFields } from 'src/data/pages/editUser'
import { connect } from 'src/core/Store/Connect'
import { IUser } from 'src/api/AuthAPI'
import { validateField } from 'src/utils/validation'
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

class User extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, EditTpl)
  }

  init() {
    const formId = 'edit-user'

    const avatar = new Avatar({})

    // validate & route
    const button = new Button({
      type: 'submit',
      children: 'Сохранить',
    })

    const events = [
      ...validationEvents,
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

    this.setProps({ formId, avatar, button, events })
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

    // TODO: не отправлять если есть ошибки валидации
    await UserController.updateUser(data as IUser)
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

      if (oldInputProps.value !== newInputProps.value) {
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

  props.fields = userSettingsFields.map((field) => {
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

export default connect(User, (state) => mapStateToProps(state.user ?? {}) ?? {})
