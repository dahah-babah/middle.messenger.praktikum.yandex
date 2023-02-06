import { TField, validate, validationError, validName } from 'src/utils/validation'
import Message from 'src/components/Message'
import Chat from 'src/components/Chat'
import Input from 'src/components/Input'

import 'src/styles/normalize.less'

type TValidationEvent = 'focus' | 'blur' | 'submit'

function highlightErrors() {
  const inputs = this._element.querySelectorAll('input')

  if (!inputs.length) return

  inputs.forEach((input: HTMLInputElement) => {
    const isValid = validate(input.value, validName(input.name) as TField)

    if (isValid) {
      input.classList.remove('error')
    } else {
      input.classList.add('error')
    }
  })
}

function getNewProps(target: HTMLInputElement, isValid: boolean) {
  return this._props.fields.map((field: { [_key: string]: Input }) => {
    // eslint-disable-next-line no-underscore-dangle
    if (field.input._props.id !== target.id) {
      return field
    }
    // eslint-disable-next-line no-underscore-dangle
    const { id, type, name, label, placeholder } = field.input._props

    return {
      input: new Input({
        id,
        type,
        name,
        label,
        placeholder,
        value: target.value,
        error: isValid ? '' : validationError[validName(name) as TField],
      }),
    }
  })
}

function validateField(target: HTMLInputElement, eventName: TValidationEvent) {
  if (!target) return

  const { value: targetValue, name: targetName } = target

  const isValid = validate(targetValue, validName(targetName) as TField)

  if (eventName !== 'focus') {
    this.setProps({ fields: getNewProps.call(this, target, isValid) })
    highlightErrors.call(this)
  }

  // eslint-disable-next-line no-console
  console.log({ event: eventName, name: targetName, value: targetValue, isValid })
}

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
      event.preventDefault()

      const form = event.target as HTMLFormElement

      if (!form) return
      const fields = Array.from(form.querySelectorAll('input') || [])

      const validation = fields.map((field) => {
        const isValid = validate(field.value, validName(field.name) as TField)

        validateField.call(this, field, 'submit')

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
