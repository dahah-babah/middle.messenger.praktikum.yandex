import AuthTpl from 'src/pages/Auth/template'

import Component, { TEvent } from 'src/core/Component'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import Input from 'src/components/Input'

import { signInPageData } from 'src/data/pages/signIn'
import { signUpPageData } from 'src/data/pages/signUp'

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

  render() {
    return this.compile(AuthTpl)
  }
}

const SignInPage = new Auth(signInPageData)
const SignUpPage = new Auth(signUpPageData)

export { SignInPage, SignUpPage }
