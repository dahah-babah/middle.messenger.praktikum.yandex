import Component from 'src/core/Component'
import ChatsTpl from 'src/pages/Chats/template'
import ChatPreview from 'src/components/ChatPreview'
import Chat from 'src/components/Chat'

type TChatPreview = { [key: string]: ChatPreview }

interface IProps {
  hasNoChats: boolean
  chats: TChatPreview[]
  activeChat: Chat | null
}

class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  init() {
    // чтобы избавиться от одного из флажков, нужно уметь парсить блок else
    const hasNoChats = true
    const activeChat = null

    const chats: TChatPreview[] = []

    this.setProps({ hasNoChats, activeChat, chats })
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

export default Chats
