import Component from '@/core/Component'
import ChatTpl from '@/components/Chat/template'
import Message from '@/components/Message'

interface IProps {
  avatar: string
  user: string
  messages: { [key: string]: Message }[]
}

class Chat extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ChatTpl)
  }

  addEvents() {
    super.addEvents()

    const input = this._element.querySelector('#message') as HTMLInputElement
    const button = this._element.querySelector('#send-message') as HTMLButtonElement

    if (!button || !input) return

    input.addEventListener('input', (event) => {
      const { target } = event

      if (!target) return

      input.value = (target as HTMLInputElement).value
    })

    button.addEventListener('click', () => {
      const text = input.value
      const message = new Message({
        text,
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        fromMe: true,
        fromUser: false,
      })

      this.setProps({ messages: [...this._props.messages, { message }] })
    })
  }

  render() {
    return this.compile(ChatTpl)
  }
}

export default Chat
