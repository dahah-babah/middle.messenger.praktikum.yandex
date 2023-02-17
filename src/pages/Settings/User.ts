import EditTpl from 'src/pages/Settings/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Avatar from 'src/components/Avatar'
import Input from 'src/components/Input'
import { validationEvents } from 'src/data/events'
import { userSettingsFields } from 'src/data/pages/editUser'

interface IProps {
  formId: string
  avatar: Avatar
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

    const fields = userSettingsFields
    const events = validationEvents

    this.setProps({ formId, avatar, button, fields, events })
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

export default User
