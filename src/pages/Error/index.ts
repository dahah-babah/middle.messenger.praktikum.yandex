import Component from 'src/core/Component'
import Link from 'src/components/Link'
import ErrorTpl from 'src/pages/Error/template'

interface IProps {
  code: string
  caption: string
  link: Link
}

class Error extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ErrorTpl)
  }

  render() {
    return this.compile(ErrorTpl)
  }
}

const errorPageData404 = {
  code: '404',
  caption: 'Не туда попали',
  link: new Link({ href: '/chats', children: 'Назад к чатам' }),
}

const errorPageData500 = {
  code: '500',
  caption: 'Мы уже фиксим',
  link: new Link({ href: '/chats', children: 'Назад к чатам' }),
}

const ErrorPage404 = new Error(errorPageData404)
const ErrorPage500 = new Error(errorPageData500)

export { ErrorPage404, ErrorPage500 }
