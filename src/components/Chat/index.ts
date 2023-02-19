import Component, { TEvent } from 'src/core/Component'
import ChatTpl from 'src/components/Chat/template'
import Message from 'src/components/Message'
import Tooltip from 'src/components/Tooltip'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Store, { IStoreMessage } from 'src/core/Store/Store'
import UserController from 'src/controllers/UserController'
import ChatsController from 'src/controllers/ChatsController'
import { IUserRequest } from 'src/api/ChatsAPI'
import WebSocketMessages from 'src/core/WebSocket'
import { connect } from 'src/core/Store/Connect'
import { getMessageTime } from 'src/utils/helpers'
import avatar from 'src/assets/icons/userAvatar.svg'
import { RESOURCES_URL } from 'src/constants/url'

interface IProps {
  avatar: string
  user: string
  messages: { [key: string]: Message }[]
  tooltip?: Tooltip
  modal?: Modal
  events?: TEvent[]
}

class Chat extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ChatTpl)
  }

  async init() {
    const store = new Store()

    const userId = store.state?.user?.id
    const chatId = store.state?.chats?.activeChatId

    if (!userId || !chatId) {
      throw new Error('Cannot open ws without chat id and user id')
    }

    let userAvatar = avatar

    try {
      const chatUsers = await ChatsController.fetchChatUsers(chatId)
      const chatUserId = chatUsers.find((user) => user.id !== userId)?.id || 0

      const user = await UserController.fetchUserById(chatUserId)

      if (user.avatar) userAvatar = RESOURCES_URL + user.avatar
    } catch (error) {
      console.error(error)
    }

    const socket = new WebSocketMessages(userId, chatId)

    const events = [
      {
        tag: 'img',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLImageElement

          if (!target || target.id !== 'chat-options') return

          if (this._props.tooltip) {
            this.setProps({ tooltip: null })
          } else {
            this.openTooltip(target.id)
          }
        },
      },
      {
        tag: 'form',
        name: 'submit',
        callback(event: Event) {
          event.preventDefault()

          const target = event.target as HTMLFormElement

          if (!target) return

          const input = target.querySelector('#message-input') as HTMLInputElement

          if (!input) return

          socket?.sendMessage(input.value)
        },
      },
    ]

    this.setProps({ events, avatar: userAvatar })
  }

  openTooltip(nodeId: string) {
    const options = [
      { id: 'add-user', title: 'Добавить пользователя' },
      { id: 'delete-user', title: 'Удалить пользователя' },
    ]

    const events = [
      {
        tag: 'li',
        name: 'click',
        context: this,
        callback(event: Event) {
          const target = event.target as HTMLLIElement

          if (!target) return

          this.openModal(options.find(({ id }) => id === target.id))
        },
      },
    ]

    const tooltip = new Tooltip({ nodeId, options, events })

    this.setProps({ tooltip })
  }

  openModal({ id, title }: { id: string; title: string }) {
    const input = new Input({
      id,
      type: 'text',
      name: 'login',
      value: '',
      placeholder: 'Логин',
      label: 'Логин',
    })

    const button = new Button({
      type: 'submit',
      children: title.split(' ')[0],
    })

    const events = [
      {
        tag: 'form',
        name: 'submit',
        context: this,
        callback(event: Event) {
          event.preventDefault()

          const target = event.target as HTMLFormElement
          const inputLogin = target.querySelector('input') as HTMLInputElement

          if (!inputLogin) return

          if (target.id === 'add-user') {
            this.addUser(inputLogin.value)
          } else if (target.id === 'delete-user') {
            this.deleteUser(inputLogin.value)
          }
        },
      },
    ]

    const modal = new Modal({ id, title, input, button, events })

    this.setProps({ modal, tooltip: null })
  }

  async addUser(login: string) {
    try {
      const users = await this.getChatData(login)

      await ChatsController.addUser(users)
    } catch (error) {
      console.error(error)
    } finally {
      this.setProps({ modal: null })
    }
  }

  async deleteUser(login: string) {
    try {
      const users = await this.getChatData(login)

      await ChatsController.deleteUser(users)
    } catch (error) {
      console.error(error)
    } finally {
      this.setProps({ modal: null })
    }
  }

  async getChatData(login: string): Promise<IUserRequest> {
    try {
      const store = new Store()
      const chatId = store.state?.chats?.activeChatId

      if (!chatId) {
        throw new Error('No chat id')
      }

      const users = await UserController.fetchUsersByLogin({ login })
      const userIds = users.map(({ id }) => id)

      return { users: userIds, chatId }
    } catch (error) {
      throw new Error('Fetch failed')
    }
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (oldProps.messages.length !== newProps.messages.length) {
      setTimeout(() => {
        const lastLiElement = document.querySelector('#messages')?.lastChild as HTMLLIElement

        if (!lastLiElement) return

        lastLiElement.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }

    return super.componentDidUpdate(oldProps, newProps)
  }

  render() {
    return this.compile(ChatTpl)
  }
}

const mapStateToProps = (state: IStoreMessage[]): IProps => {
  const props = {} as IProps
  const store = new Store()

  const userId = store.state?.user?.id

  if (!userId) {
    throw new Error('No user id while mapping messages')
  }

  props.messages = state.map((msg) => ({
    message: new Message({
      text: msg.content,
      date: getMessageTime(msg.time),
      fromMe: msg.user_id === userId,
      fromUser: msg.user_id !== userId,
    }),
  }))

  return props
}

export default connect(Chat, (state) => mapStateToProps(state.messages ?? []) ?? {})
