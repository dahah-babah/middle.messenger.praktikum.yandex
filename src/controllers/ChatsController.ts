import API, { ChatsAPI, IChatsRequest, ITokenResponse, IUserRequest } from 'src/api/ChatsAPI'
import { ACTIONS } from 'src/core/Store/Actions'
import { IUser } from '/api/AuthAPI'

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

  async addUser(data: IUserRequest) {
    try {
      await this.api.addUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser(data: IUserRequest) {
    try {
      await this.api.deleteUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getWSToken(data: number): Promise<ITokenResponse> {
    try {
      return await this.api.getWSToken(data)
    } catch (error) {
      throw new Error('Fetch ws token failed')
    }
  }

  async fetchChatUsers(data: number): Promise<IUser[]> {
    try {
      return await this.api.fetchChatUsers(data)
    } catch (error) {
      throw new Error('Fetch users failed')
    }
  }
}

export default new ChatsController()
