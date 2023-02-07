import Component, { TEvent } from 'src/core/Component'
import ChatsTpl from 'src/pages/Chats/template'
import { chatsPageData } from 'src/data/pages/chats'
import ChatPreview from 'src/components/ChatPreview'
import Chat from 'src/components/Chat'

interface IProps {
  hasNoChats: boolean
  chats: { [key: string]: ChatPreview }[]
  activeChat: Chat | null
  events: TEvent[]
}

class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

export const ChatsPage = new Chats(chatsPageData)
