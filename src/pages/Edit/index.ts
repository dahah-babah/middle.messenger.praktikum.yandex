import EditTpl from 'src/pages/Edit/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Avatar from 'src/components/Avatar'
import { TInputType } from 'src/components/Input'

import { editUserData } from 'src/data/pages/editUser'
import { editPasswordData } from 'src/data/pages/editPassword'

type TField = {
  name: string
  label: string
  value: string
  type: TInputType
}

interface IProps {
  formId: string
  avatar: Avatar
  button: Button
  fields: TField[]
  events: TEvent[]
}

class Edit extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, EditTpl)
  }

  render() {
    return this.compile(EditTpl)
  }
}

const EditUserPage = new Edit(editUserData)
const EditPasswordPage = new Edit(editPasswordData)

export { EditUserPage, EditPasswordPage }
