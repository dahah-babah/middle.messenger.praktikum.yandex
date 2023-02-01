import ChatPreview from '@/components/ChatPreview'
import Chat from '@/components/Chat'

export const chatsPageData = {
  hasNoChats: false,
  activeChatId: 1,
  activeChat: new Chat({
    avatar: 'В',
    user: 'Вадим',
    messages: [
      {
        text: 'Ping',
        date: '13:13',
        fromMe: false,
      },
      {
        text: 'Pong',
        date: '13:15',
        fromMe: true,
      },
    ],
  }),
  chats: [
    {
      chat: new ChatPreview({
        id: '0',
        avatar: 'A',
        name: 'Андрей',
        preview: 'Изображение',
        time: '10:49',
        unreadCount: 2,
      }),
    },
    {
      chat: new ChatPreview({
        id: '1',
        avatar: 'И',
        name: 'Илья',
        preview: 'Друзья, у меня для вас особенный выпуск новостей!...',
        time: '15:12',
        unreadCount: 4,
      }),
    },
    {
      chat: new ChatPreview({
        id: '2',
        avatar: 'T',
        name: 'тет-а-теты',
        preview: 'И Human Interface Guidelines и Material Design рекомендуют...',
        time: 'Ср',
        unreadCount: 0,
      }),
    },
  ],
}
