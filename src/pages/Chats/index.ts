import Component, { TEvent } from 'src/core/Component'
import ChatsTpl from 'src/pages/Chats/template'
import ChatPreview from 'src/components/ChatPreview'
import Chat from 'src/components/Chat'
import Modal from 'src/components/Modal'
import Input from '/components/Input'
import Button from '/components/Button'
import ChatsController from '/controllers/ChatsController'

type TChatPreview = { [key: string]: ChatPreview }

interface IProps {
  hasNoChats: boolean
  activeChat: Chat | null
  modal: Modal
  chats: TChatPreview[]
  events: TEvent[]
}

class Chats extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ChatsTpl)
  }

  init() {
    // чтобы избавиться от одного из флажков, нужно уметь парсить блок else
    const hasNoChats = true
    const activeChat = null

    const chats: TChatPreview[] = []

    const events = [
      {
        tag: 'li',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLLIElement

          if (target.id === 'new-chat') {
            this.openModal()
          } else {
            // open existed chat
            // this.setProps({ hasNoChats: false, activeChat })
          }
        },
      },
    ]

    this.setProps({ hasNoChats, activeChat, chats, events })
  }

  openModal() {
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

          this.createChat(target)
        },
      },
    ]

    const modal = new Modal({ id: 'new-chat', title: 'Новый чат', input, button, events })

    this.setProps({ modal })
  }

  async createChat(form: HTMLFormElement) {
    const input = form.querySelector('input') as HTMLInputElement

    if (!input) return

    await ChatsController.createChat({ title: input.value })

    this.setProps({ modal: null })
  }

  render() {
    return this.compile(ChatsTpl)
  }
}

export default Chats
