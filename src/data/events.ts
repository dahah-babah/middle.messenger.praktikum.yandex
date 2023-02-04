import { TField, validate, validName } from 'src/utils/validation'

import 'src/styles/normalize.less'

export const validationEvents = [
  {
    tag: 'input',
    name: 'focus',
    callback: (event: Event) => {
      event.preventDefault()

      const { target } = event

      if (!target) return

      const { name, value } = target as HTMLInputElement

      const isValid = validate(value, validName(name) as TField)
      // eslint-disable-next-line no-console
      console.log({ event: 'focus', name, value, isValid })
    },
  },
  {
    tag: 'input',
    name: 'blur',
    callback: (event: Event) => {
      event.preventDefault()

      const { target } = event

      if (!target) return

      const { name, value } = target as HTMLInputElement

      const isValid = validate(value, validName(name) as TField)
      // eslint-disable-next-line no-console
      console.log({ event: 'blur', name, value, isValid })
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
