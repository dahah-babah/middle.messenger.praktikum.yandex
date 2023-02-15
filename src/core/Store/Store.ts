import EventBus from 'src/core/EventBus'

export enum StoreEvents {
  UPDATED = 'updated',
}

class Store extends EventBus {
  static instance: Store

  static STORE_NAME = 'store'

  state: any = {}

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

  set(key: string, value: string) {
    this.state[key] = value
    this.emit(StoreEvents.UPDATED)

    return this
  }
}

export default new Store()
