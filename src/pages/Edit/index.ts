import EditTpl from '@/pages/Edit/template'

import Component, { TEvent } from '@/core/Component'
import Button from '@/components/Button'
import Avatar from '@/components/Avatar'
import { TInputType } from '@/components/Input'

import { editUserData } from '@/data/pages/editUser'
import { editPasswordData } from '@/data/pages/editPassword'

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
