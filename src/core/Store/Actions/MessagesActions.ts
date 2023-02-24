import Store, { IStoreMessage } from 'src/core/Store/Store'

const store = new Store()

export const messagesActions = {
  setMessages: (data: IStoreMessage[]) => {
    store.set('messages', [...data])
  },

  addMessage: (data: IStoreMessage) => {
    const state = store.getState()
    const messages = state.messages ?? []

    store.set('messages', [...messages, data])
  },
}
