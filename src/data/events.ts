import { validateField } from 'src/utils/validation'
import { handleRoute } from 'src/utils/router'

import Message from 'src/components/Message'
import Chat from 'src/components/Chat'

import 'src/styles/normalize.less'

export const validationEvents = [
  {
    tag: 'input',
    name: 'focus',
    callback(event: Event) {
      const target = event.target as HTMLInputElement

      validateField.call(this, target, 'focus')
    },
  },
  {
    tag: 'input',
    name: 'blur',
    callback(event: Event) {
      const target = event.target as HTMLInputElement

      validateField.call(this, target, 'blur')
    },
  },
  {
    tag: 'form',
    name: 'submit',
    callback(event: Event) {
      this.onSubmit(event)

      // const login = validation.find(({ name }) => name === 'login')?.value
      // const password = validation.find(({ name }) => name === 'password')?.value
      //
      // ACTIONS.setUser(login, password)
    },
  },
]

export const chatEvents = [
  {
    tag: 'input',
    name: 'change',
    callback(event: Event) {
      const input = this._element.querySelector('#message') as HTMLInputElement
      const target = event.target as HTMLInputElement

      input.value = (target as HTMLInputElement).value
    },
  },
  {
    tag: 'button',
    name: 'click',
    callback() {
      const input = this._element.querySelector('#message') as HTMLInputElement

      if (!input) return

      const text = input.value

      const message = new Message({
        text,
        date: `${new Date().getHours()}:${new Date().getMinutes()}`,
        fromMe: true,
        fromUser: false,
      })

      this.setProps({ messages: [...this._props.messages, { message }] })
    },
  },
]

const activeChat = new Chat({
  avatar: 'В',
  user: 'Вадим',
  messages: [
    {
      message: new Message({ text: 'Ping', date: '13:13', fromMe: false, fromUser: true }),
    },
    {
      message: new Message({ text: 'Pong', date: '13:15', fromMe: true, fromUser: false }),
    },
  ],
  events: chatEvents,
})

export const chatPreviewEvents = [
  {
    tag: 'li',
    name: 'click',
    callback() {
      this.setProps({ hasNoChats: false, activeChat })
    },
  },
]

export const routerEvents = [
  {
    tag: 'div',
    name: 'click',
    callback(event: Event) {
      const target = event.target as HTMLDivElement
      const closest = target.closest('div') as HTMLDivElement

      handleRoute(target.id || closest.id)
    },
  },
]
