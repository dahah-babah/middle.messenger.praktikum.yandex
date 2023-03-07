import { Component, TEvent } from '@/core/Component'
import ChatPreviewTpl from '@/components/ChatPreview/template'

interface IProps {
  id: number
  title: string
  avatar: string
  avatarUrl: string | null
  preview: string
  time: string
  unreadCount: number
  events?: TEvent[]
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
