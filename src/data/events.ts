import { TField, validate, validName } from 'src/utils/validation'

import 'src/styles/normalize.less'

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
