import Component, { TEvent } from '@/core/Component'
import ChatsTpl from '@/pages/Chats/template'
import Chat from '@/components/ChatPreview'
import { chatsPageData } from '@/data/pages/chats'

interface IProps {
  hasNoChats: boolean
  activeChatId: number
  chats: { [key: string]: Chat }[]
  events: TEvent[]
}

class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  addEvents() {
    super.addEvents()

    const chats = this._element.querySelectorAll('li')

    chats.forEach((chat) =>
      chat.addEventListener('click', (event) => {
        const chatId = event.target.closest('li').firstChild.id

        this.setProps({ hasNoChats: false, activeChatId: chatId })
      }),
    )
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

export const ChatsPage = new Chats(chatsPageData)
