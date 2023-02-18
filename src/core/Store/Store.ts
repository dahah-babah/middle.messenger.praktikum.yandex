import EventBus from 'src/core/EventBus'
import { IUser } from 'src/api/AuthAPI'
import { IChatsResponse } from 'src/api/ChatsAPI'

export enum StoreEvents {
  UPDATED = 'updated',
}

type TKey = 'user' | 'chats'

export interface IStoreChats {
  searchQuery: string
  activeChatId: number
  chats: IChatsResponse[]
}

export interface IState {
  user?: IUser
  chats?: IStoreChats
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

  removeState() {
    this.state = {}
    this.emit(StoreEvents.UPDATED)
  }

  set(key: TKey, value: any) {
    this.state[key] = value
    this.emit(StoreEvents.UPDATED)

    return this
  }
}

export default Store
