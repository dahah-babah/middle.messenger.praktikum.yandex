import Store from 'src/core/Store/Store'
import { IChatsResponse } from 'src/api/ChatsAPI'

const store = new Store()

export const chatsActions = {
  setChats: (data: IChatsResponse[]) => {
    const state = store.getState()
    const chats = state.chats ?? {}

    store.set('chats', { ...chats, chats: [...data] })
  },

  setSearchQuery: (data: string) => {
    const state = store.getState()
    const chats = state.chats ?? {}

    store.set('chats', { ...chats, searchQuery: data })
  },

  setActiveChatId: (data: number) => {
    const state = store.getState()
    const chats = state.chats ?? {}

    store.set('chats', { ...chats, activeChatId: data })
  },

  updateChats: (data: IChatsResponse) => {
    const state = store.getState()
    const { chats } = state.chats ?? {}

    const oldChats =
      chats?.map((chat) => {
        if (chat.id === data.id) {
          return { ...chat, avatar: data.avatar }
        }

        return chat
      }) ?? []

    store.set('chats', { ...state.chats, chats: [...oldChats] })
  },
}
