import API, { ChatsAPI } from 'src/api/ChatsAPI'

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
}

export default new ChatsController()
