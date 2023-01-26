import Component from '@/core/Component'
import ChatsTpl from '@/pages/Chats/template'
import Chat from '@/components/Chat'

interface IProps {
    chats: { [key: string]: Chat }[]
}

class Chats extends Component<IProps> {
    constructor(props: IProps) {
        super('section', props, ChatsTpl)
    }

    render() {
        return this.compile(ChatsTpl)
    }
}

const chatsPageData = {
    chats: [
        {
            chat: new Chat({
                avatar: 'A',
                name: 'Андрей',
                preview: 'Изображение',
                time: '10:49',
                unreadCount: 2,
            }),
        },
        {
            chat: new Chat({
                avatar: 'И',
                name: 'Илья',
                preview: 'Друзья, у меня для вас особенный выпуск новостей!...',
                time: '15:12',
                unreadCount: 4,
            }),
        },
        {
            chat: new Chat({
                avatar: 'T',
                name: 'тет-а-теты',
                preview: 'И Human Interface Guidelines и Material Design рекомендуют...',
                time: 'Ср',
                unreadCount: 0,
            }),
        },
    ],
}

export const ChatsPage = new Chats(chatsPageData)
