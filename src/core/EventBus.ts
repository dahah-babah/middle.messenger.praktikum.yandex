interface IListener {
  [key: string]: Function[]
}

export interface IEventBus {
  on(event: string, callback: Function): void
  off(event: string, callback: Function): void
  emit<T extends []>(event: string, args: T): void
}

export default class EventBus implements IEventBus {
  listeners: IListener

  constructor() {
    this.listeners = {} as IListener
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }

  emit<T extends []>(event: string, ...args: T): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
