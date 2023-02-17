import Component, { TEvent } from 'src/core/Component'
import Link from 'src/components/Link'
import ErrorTpl from 'src/pages/Error/template'
import { handleRoute } from '/utils/router'

interface IProps {
  code: string
  caption: string
  link: Link
  events: TEvent[]
}

class NotFound extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ErrorTpl)
  }

  init() {
    const code = '404'
    const caption = 'Не туда попали'

    const link = new Link({
      id: 'chats',
      children: 'Назад к чатам',
      events: [
        {
          tag: 'div',
          name: 'click',
          callback: () => {
            handleRoute('chats')
          },
        },
      ],
    })

    this.setProps({ code, caption, link })
  }

  render() {
    return this.compile(ErrorTpl)
  }
}

export default NotFound
