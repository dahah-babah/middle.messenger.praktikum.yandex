import API, { ChatsAPI, IChatsRequest } from 'src/api/ChatsAPI'
import { ACTIONS } from 'src/core/Store/Actions'

class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async createChat(data: { title: string }) {
    try {
      await this.api.createChat(data)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchChats(data?: IChatsRequest) {
    try {
      const { limit = 100, offset = 0, title = '' } = data ?? {}
      const chats = await this.api.fetchChats({ limit, offset, title })

      ACTIONS.setChats(chats)
      ACTIONS.setSearchQuery(title)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteChat(data: { chatId: number }) {
    try {
      await this.api.deleteChat(data)
      await this.fetchChats()
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ChatsController()
