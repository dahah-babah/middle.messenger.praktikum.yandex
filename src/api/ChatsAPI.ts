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

export interface IChatDeleteResponse {
  userId: string
  result: {
    id: number
    title: string
    avatar: string
  }
}

export interface IUserRequest {
  users: number[]
  chatId: number
}

export interface ITokenResponse {
  token: string
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

  deleteChat(data: { chatId: number }): Promise<IChatDeleteResponse> {
    return this.http.delete('', data)
  }

  addUser(data: IUserRequest) {
    return this.http.put('/users', data)
  }

  deleteUser(data: IUserRequest) {
    return this.http.delete('/users', data)
  }

  getWSToken(data: number): Promise<ITokenResponse> {
    return this.http.post(`/token/${data}`)
  }
}

export default new ChatsAPI()
