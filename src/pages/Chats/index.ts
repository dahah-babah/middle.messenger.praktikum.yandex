import Component, { TEvent } from 'src/core/Component'
import ChatsTpl from 'src/pages/Chats/template'
import ChatPreview from 'src/components/ChatPreview'
import Chat from 'src/components/Chat'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import ChatsController from 'src/controllers/ChatsController'
import { connect } from 'src/core/Store/Connect'
import Store, { IStoreChats } from 'src/core/Store/Store'
import { handleRoute } from 'src/utils/router'
import { ACTIONS } from 'src/core/Store/Actions'
import { getMessageTime } from 'src/utils/helpers'
import { RESOURCES_URL } from 'src/constants/url'

type TChatPreview = { [chat: string]: ChatPreview }

interface IProps {
  hasNoChats: boolean
  searchQuery: string
  activeChat: typeof Chat | null
  modal: Modal
  chats: TChatPreview[]
  events: TEvent[]
}

// TODO: вынести отдельно компонент со списком чатов
class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  init() {
    const self = this
    const hasNoChats = true

    const events = [
      {
        tag: 'li',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLLIElement

          if (!target) return

          if (target.id === 'new-chat') {
            self.openModal()
          } else {
            const chatId = target.closest('li')?.children[0].children[0].getAttribute('id')

            if (!chatId) {
              throw new Error('No chat id')
            }

            self.openChat(chatId)
          }
        },
      },
      {
        tag: 'input',
        name: 'change',
        callback(event: Event) {
          const target = event.target as HTMLInputElement

          if (!target || target.id !== 'search') return

          self.fetchChats(target.value)
        },
      },
      {
        tag: 'div',
        name: 'click',
        callback: (event: Event) => {
          const target = event.target as HTMLInputElement

          if (!target || target.id !== 'profile') return

          handleRoute('profile')
        },
      },
      {
        tag: 'img',
        name: 'click',
        callback: (event: Event) => {
          const target = event.target as HTMLImageElement

          if (!target || target.id !== 'cross') return

          const chatId = target.parentElement?.id

          if (!chatId) {
            throw new Error('No chat id')
          }

          self.deleteChat(chatId)
        },
      },
    ]

    this.setProps({ hasNoChats, events })
  }

  openChat(chatId: string) {
    ACTIONS.setActiveChatId(+chatId)

    const store = new Store()
    const chatData = store?.state?.chats?.chats.find((chat) => chat.id === +chatId)

    if (!chatData) {
      throw new Error('No chat data in store')
    }

    const activeChat = new Chat({
      avatar: chatData.avatar,
      user: chatData.title,
      messages: [],
    })

    this.setProps({ activeChat, hasNoChats: false })
  }

  openModal() {
    const self = this

    const input = new Input({
      id: 'add-chat',
      type: 'text',
      name: 'chat-title',
      value: '',
      placeholder: 'Название чата',
      label: 'Название чата',
    })

    const button = new Button({
      type: 'submit',
      children: 'Добавить',
    })

    const events = [
      {
        tag: 'form',
        name: 'submit',
        context: this,
        callback(event: Event) {
          event.preventDefault()

          const target = event.target as HTMLFormElement

          self.createChat(target)
        },
      },
    ]

    const modal = new Modal({ id: 'new-chat', title: 'Новый чат', input, button, events })

    this.setProps({ modal })
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (oldProps.chats.length !== newProps.chats.length) {
      return true
    }

    return super.componentDidUpdate(oldProps, newProps)
  }

  async createChat(form: HTMLFormElement) {
    const input = form.querySelector('input') as HTMLInputElement

    if (!input) return

    await ChatsController.createChat({ title: input.value })

    this.setProps({ modal: null })

    await ChatsController.fetchChats()
  }

  async fetchChats(title: string) {
    await ChatsController.fetchChats({ limit: 100, offset: 0, title })
  }

  async deleteChat(id: string) {
    await ChatsController.deleteChat({ chatId: +id })

    this.setProps({ activeChat: null })
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

const mapStateToProps = (state: IStoreChats): IProps => {
  const props = {} as IProps

  const { chats, searchQuery } = state

  props.searchQuery = searchQuery ?? ''

  props.chats =
    chats?.map((chat) => ({
      chat: new ChatPreview({
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar ? '' : chat.title.slice(0, 1).toUpperCase(),
        avatarUrl: chat.avatar ? RESOURCES_URL + chat.avatar : null,
        preview: chat.last_message?.content ?? 'Сообщений нет',
        time: chat.last_message?.time ? getMessageTime(chat.last_message?.time) : '',
        unreadCount: chat.unread_count,
      }),
    })) ?? []

  return props
}

export default connect(Chats, (state) => mapStateToProps(state.chats ?? {}) ?? {})
