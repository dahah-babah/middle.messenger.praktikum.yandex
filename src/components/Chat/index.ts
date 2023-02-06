import Component, { TEvent } from 'src/core/Component'
import ChatTpl from 'src/components/Chat/template'
import Message from 'src/components/Message'

interface IProps {
  avatar: string
  user: string
  messages: { [key: string]: Message }[]
  events: TEvent[]
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
