import BaseAPI from 'src/api/BaseAPI'

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  createChat(data: { title: string }) {
    return this.http.post('', data)
  }
}

export default new ChatsAPI()
