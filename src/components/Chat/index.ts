import Component, { TEvent } from 'src/core/Component'
import ChatTpl from 'src/components/Chat/template'
import Message from 'src/components/Message'
import Tooltip from 'src/components/Tooltip'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import Store from 'src/core/Store/Store'
import UserController from 'src/controllers/UserController'
import ChatsController from 'src/controllers/ChatsController'
import { IUserRequest } from 'src/api/ChatsAPI'

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

  init() {
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
    ]

    this.setProps({ events })
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

  render() {
    return this.compile(ChatTpl)
  }
}

export default Chat
