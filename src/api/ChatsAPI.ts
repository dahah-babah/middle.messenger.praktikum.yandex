import BaseAPI from 'src/api/BaseAPI'
import { IUser } from 'src/api/AuthAPI'

export interface IChatsRequest {
  limit: number
  offset: number
  title: string
}

interface ILastMessage {
  user: IUser
  time: string
  content: string
}

export interface IChatsResponse {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: ILastMessage
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  createChat(data: { title: string }) {
    return this.http.post('', data)
  }

  fetchChats(data: IChatsRequest): Promise<IChatsResponse[]> {
    return this.http.get('', data)
  }
}

export default new ChatsAPI()
