import { validateField } from 'src/utils/validation'

import Message from 'src/components/Message'

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
    },
  },
]

// typing message
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
