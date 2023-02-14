import AuthTpl from 'src/pages/Auth/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import Input from 'src/components/Input'

interface IProps {
  formId: string
  title: string
  link: Link
  button: Button
  fields: { [key: string]: Input }[]
  events: TEvent[]
}

class Auth extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, AuthTpl)
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
    return this.compile(AuthTpl)
  }
}

export default Auth
