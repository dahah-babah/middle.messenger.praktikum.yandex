import Component, { TEvent } from 'src/core/Component'
import ChatTpl from 'src/components/Chat/template'
import Message from 'src/components/Message'
import Tooltip from 'src/components/Tooltip'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Store, { IState } from 'src/core/Store/Store'
import UserController from 'src/controllers/UserController'
import ChatsController from 'src/controllers/ChatsController'
import { IUserRequest } from 'src/api/ChatsAPI'
import WebSocketMessages from 'src/core/WebSocket'
import { connect } from 'src/core/Store/Connect'
import { getMessageTime } from 'src/utils/helpers'
import { RESOURCES_URL } from 'src/constants/url'
import { isValid } from 'src/utils/validation'
import chatAvatarUpload from 'src/assets/icons/chatAvatarUpload.svg'

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
    const self = this
    const store = new Store()

    const userId = store.state?.user?.id
    const chatId = store.state?.chats?.activeChatId

    if (!userId || !chatId) {
      throw new Error('Cannot open ws without chat id and user id')
    }

    const activeChatAvatar = store.state?.chats?.chats.find((chat) => chat.id === chatId)?.avatar
    const chatAvatar = activeChatAvatar ? RESOURCES_URL + activeChatAvatar : chatAvatarUpload

    const socket = new WebSocketMessages(userId, chatId)

    const events = [
      {
        tag: 'img',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLImageElement

          if (!target || target.id !== 'chat-options') return

          // eslint-disable-next-line no-underscore-dangle
          if (self._props.tooltip) {
            self.setProps({ tooltip: null })
          } else {
            self.openTooltip(target.id)
          }
        },
      },
      {
        tag: 'input',
        name: 'change',
        callback(event: Event) {
          const target = event.target as HTMLInputElement

          if (!target || target.id !== 'chat-avatar') return

          const { files } = target

          if (!files) return

          self.uploadFile(chatId, files[0])
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

          const isInputValid = isValid(input.value, 'message')

          if (isInputValid) {
            socket?.sendMessage(input.value)
          }
        },
      },
    ]

    this.setProps({ events, avatar: chatAvatar })
  }

  openTooltip(nodeId: string) {
    const self = this

    const options = [
      { id: 'add-user', title: 'Добавить пользователя' },
      { id: 'delete-user', title: 'Удалить пользователя' },
    ]

    const events = [
      {
        tag: 'li',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLLIElement

          if (!target) return

          const modalData = options.find(({ id }) => id === target.id)

          if (modalData) {
            self.openModal(modalData)
          }
        },
      },
    ]

    const tooltip = new Tooltip({ nodeId, options, events })

    this.setProps({ tooltip })
  }

  openModal({ id, title }: { id: string; title: string }) {
    const self = this

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
        async callback(event: Event) {
          event.preventDefault()

          const target = event.target as HTMLFormElement
          const inputLogin = target.querySelector('input') as HTMLInputElement

          if (!inputLogin) return

          if (target.id === 'add-user') {
            try {
              await self.addUser(inputLogin.value)
            } catch (error) {
              console.error(error)
            }
          } else if (target.id === 'delete-user') {
            try {
              await self.deleteUser(inputLogin.value)
            } catch (error) {
              console.error(error)
            }
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

  async uploadFile(chatId: number, file: File) {
    const formData = new FormData()
    const newFile = new File([file], file.name.replace(/\s/g, '_'))

    formData.append('avatar', newFile)
    formData.append('chatId', chatId.toString())

    await ChatsController.updateChatPhoto(formData)
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

const mapStateToProps = (state: IState): IProps => {
  const props = {} as IProps
  const userId = state?.user?.id

  if (!userId) {
    throw new Error('No user id while mapping messages')
  }

  const messages = state.messages ?? []
  const chats = state.chats?.chats ?? []

  const chatAvatar = chats.find(({ id }) => id === state.chats?.activeChatId)?.avatar

  if (chatAvatar) {
    props.avatar = RESOURCES_URL + chatAvatar
  }

  props.messages = messages.map((msg) => ({
    message: new Message({
      text: msg.content,
      date: getMessageTime(msg.time),
      fromMe: msg.user_id === userId,
      fromUser: msg.user_id !== userId,
    }),
  }))

  return props
}

export default connect(Chat, (state) => mapStateToProps(state ?? {}) ?? {})
