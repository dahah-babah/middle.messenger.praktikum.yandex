import { TField, validate, validName } from 'src/utils/validation'
import Message from 'src/components/Message'

import 'src/styles/normalize.less'
import Chat from 'src/components/Chat'

const validateField = (event: Event, eventName: string) => {
  event.preventDefault()

  const { target } = event

  if (!target) return

  const input = target as HTMLInputElement

  const isValid = validate(input.value, validName(input.name) as TField)

  if (isValid) {
    input.classList.remove('error')
  } else {
    input.classList.add('error')
  }

  // eslint-disable-next-line no-console
  console.log({ event: eventName, name: input.name, value: input.value, isValid })
}

export const validationEvents = [
  {
    tag: 'input',
    name: 'focus',
    callback: (event: Event) => {
      validateField(event, 'focus')
    },
  },
  {
    tag: 'input',
    name: 'blur',
    callback: (event: Event) => {
      validateField(event, 'blur')
    },
  },
  {
    tag: 'form',
    name: 'submit',
    callback: (event: Event) => {
      event.preventDefault()

      const { target } = event

      if (!target) return

      const form = target as HTMLFormElement
      const fields = Array.from(form.querySelectorAll('input') || [])

      const validation = fields.map((field) => {
        const isValid = validate(field.value, validName(field.name) as TField)

        if (isValid) {
          field.classList.remove('error')
        } else {
          field.classList.add('error')
        }

        return {
          name: field.name,
          value: field.value,
          isValid,
        }
      })

      // eslint-disable-next-line no-console
      console.log({ form: form.id, event: 'submit', validation })
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
