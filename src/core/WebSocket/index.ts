import { WS_URL } from 'src/constants/url'
import EventBus, { IEventBus } from 'src/core/EventBus'
import ChatsController from 'src/controllers/ChatsController'
import { ACTIONS } from 'src/core/Store/Actions'

class WebSocketMessages {
  static instance: WebSocketMessages

  private eventBus: IEventBus

  socket: WebSocket | null

  userId: number

  chatId: number

  static EVENTS = {
    OPEN: 'open',
    CLOSE: 'close',
    MESSAGE: 'message',
    ERROR: 'error',
    CONNECT: 'connect',
  }

  constructor(userId: number, chatId: number) {
    // if (WebSocketMessages.instance) {
    //   return WebSocketMessages.instance
    // }

    WebSocketMessages.instance = this

    this.userId = userId
    this.chatId = chatId

    this.eventBus = new EventBus()

    this.registerEvents()
    this.eventBus.emit(WebSocketMessages.EVENTS.CONNECT)
  }

  async connect() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.disconnect()
    }

    const { token } = await ChatsController.getWSToken(this.chatId)

    const WS_MESSAGES_URL = `${WS_URL}/${this.userId}/${this.chatId}/${token}`

    this.socket = new WebSocket(WS_MESSAGES_URL)

    this.socket.addEventListener('open', () => {
      this.eventBus.emit(WebSocketMessages.EVENTS.OPEN)

      setInterval(
        (self: WebSocketMessages) => {
          self.ping()
        },
        10000,
        this,
      )
    })

    this.socket.addEventListener('close', (event) => {
      this.eventBus.emit(WebSocketMessages.EVENTS.CLOSE, [event])
    })

    this.socket.addEventListener('message', (event) => {
      this.eventBus.emit(WebSocketMessages.EVENTS.MESSAGE, [event])
    })

    this.socket.addEventListener('error', (event) => {
      this.eventBus.emit(WebSocketMessages.EVENTS.ERROR, [event])
    })
  }

  disconnect() {
    this.socket?.close()
    this.socket = null
  }

  onOpen() {
    this.getMessages()
  }

  onClose() {
    this.disconnect()
  }

  onMessage(event: MessageEvent) {
    try {
      let data = JSON.parse(event.data)

      if (Array.isArray(data)) {
        data = data.filter(({ type }) => type === 'message').reverse()
      } else {
        if (data.type !== 'message') return

        ACTIONS.addMessage(data)

        return
      }

      ACTIONS.setMessages(data)
    } catch (error) {
      console.error(error)
    }
  }

  onError(event: Event) {
    console.error(event)

    this.disconnect()
  }

  sendMessage(content: string) {
    this.socket?.send(JSON.stringify({ content, type: 'message' }))
  }

  getMessages() {
    this.socket?.send(JSON.stringify({ content: '0', type: 'get old' }))
  }

  private ping() {
    this.socket?.send(JSON.stringify({ type: 'ping' }))
  }

  private registerEvents() {
    this.eventBus.on(WebSocketMessages.EVENTS.OPEN, this.onOpen.bind(this))
    this.eventBus.on(WebSocketMessages.EVENTS.CLOSE, this.onClose.bind(this))
    this.eventBus.on(WebSocketMessages.EVENTS.MESSAGE, this.onMessage.bind(this))
    this.eventBus.on(WebSocketMessages.EVENTS.ERROR, this.onError.bind(this))
    this.eventBus.on(WebSocketMessages.EVENTS.CONNECT, this.connect.bind(this))
  }
}

export default WebSocketMessages
