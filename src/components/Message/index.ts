import Component from 'src/core/Component'
import MessageTpl from 'src/components/Message/template'

interface IProps {
  text: string
  date: string
  fromMe: boolean
  fromUser: boolean
}

class Message extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, MessageTpl)
  }

  render() {
    return this.compile(MessageTpl)
  }
}

export default Message
