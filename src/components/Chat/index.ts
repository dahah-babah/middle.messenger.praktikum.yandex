import Component from '@/core/Component'
import ChatTpl from '@/components/Chat/template'

type TMessage = {
  text: string
  date: string
  fromMe: boolean
}

interface IProps {
  avatar: string
  user: string
  messages: TMessage[]
}

class Chat extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ChatTpl)
  }

  render() {
    return this.compile(ChatTpl)
  }
}

export default Chat
