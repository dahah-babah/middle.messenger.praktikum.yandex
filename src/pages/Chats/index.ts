import Component from '@/core/Component'
import ChatsTpl from '@/pages/Chats/template'
import { chatsPageData } from '@/data/pages/chats'
import ChatPreview from '@/components/ChatPreview'
import Chat from '@/components/Chat'
import Message from '@/components/Message'

interface IProps {
  hasNoChats: boolean
  activeChatId: number
  chats: { [key: string]: ChatPreview }[]
  activeChat: Chat
}

const activeChat = new Chat({
  avatar: 'В',
  user: 'Вадим',
  messages: [
    {
      message: new Message({ text: 'Ping', date: '13:13', fromMe: false, fromUser: true }),
    },
    {
      message: new Message({ text: 'Pong', date: '13:15', fromMe: true, fromUser: false }),
    },
  ],
})

class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  addEvents() {
    super.addEvents()

    const chats = this._element.querySelectorAll('li')

    chats[0].addEventListener('click', () => {
      this.setProps({ hasNoChats: false, activeChat })
    })
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

export const ChatsPage = new Chats(chatsPageData)
