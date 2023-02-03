import Component from '@/core/Component'
import ChatPreviewTpl from '@/components/ChatPreview/template'

interface IProps {
  id: string
  avatar: string
  name: string
  preview: string
  time: string
  unreadCount: number
}

class ChatPreview extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ChatPreviewTpl)
  }

  render() {
    return this.compile(ChatPreviewTpl)
  }
}

export default ChatPreview