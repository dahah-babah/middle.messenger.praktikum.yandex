import EditTpl from 'src/pages/Edit/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Avatar from 'src/components/Avatar'
import Input from 'src/components/Input'

import { editUserData } from 'src/data/pages/editUser'
import { editPasswordData } from 'src/data/pages/editPassword'

// type TUserField = {
//   name: string
//   label: string
//   value: string
//   type: TInputType
// }

interface IProps {
  formId: string
  avatar: Avatar
  button: Button
  // fields: TUserField[]
  fields: { [key: string]: Input }[]
  events: TEvent[]
}

class Edit extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, EditTpl)
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    const oldFields = oldProps.fields
    const newFields = newProps.fields

    let shouldUpdate = false

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

const EditUserPage = new Edit(editUserData)
const EditPasswordPage = new Edit(editPasswordData)

export { EditUserPage, EditPasswordPage }
