import AuthTpl from '@/pages/Auth/template'

import Component, { TEvent } from '@/core/Component'
import Button from '@/components/Button'
import Link from '@/components/Link'
import Input from '@/components/Input'

import { signInPageData } from '@/data/pages/signIn'
import { signUpPageData } from '@/data/pages/signUp'

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
