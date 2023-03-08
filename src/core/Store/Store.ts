import EventBus from '@/core/EventBus'
import { IUser } from '@/api/AuthAPI'
import { IChatsResponse } from '@/api/ChatsAPI'

export enum StoreEvents {
  UPDATED = 'updated',
}

type TKey = 'user' | 'chats' | 'messages'

export interface IStoreChats {
  searchQuery: string
  activeChatId: number
  chats: IChatsResponse[]
}

interface IMessageFile {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}

export interface IStoreMessage {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: IMessageFile
}

export interface IState {
  user?: IUser
  chats?: IStoreChats
  messages?: IStoreMessage[]
}

class Store extends EventBus {
  static instance: Store

  static STORE_NAME = 'store'

  state: IState = {}

  constructor() {
    if (Store.instance) {
      return Store.instance
    }

    super()

    const savedState = localStorage.getItem(Store.STORE_NAME)

    this.state = savedState ? JSON.parse(savedState) ?? {} : {}

    Store.instance = this

    this.on(StoreEvents.UPDATED, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state))
    })
  }

  getState() {
    return this.state
  }

  set(key: TKey, value: any) {
    this.state[key] = value
    this.emit(StoreEvents.UPDATED)

    return this
  }
}

export default Store
