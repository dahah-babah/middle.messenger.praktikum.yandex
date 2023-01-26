import Component from '@/core/Component'
import ChatTpl from '@/components/Chat/template'

interface IProps {
    avatar: string
    name: string
    preview: string
    time: string
    unreadCount: number
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
