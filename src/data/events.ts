import { TField, validate, validName } from '@/utils/validation'

export const validationEvents = [
  {
    tag: 'input',
    name: 'focus',
    callback: (event: Event) => {
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

      const validation = fields.map(({ name, value }) => ({
        name,
        value,
        isValid: validate(value, validName(name) as TField),
      }))

      // eslint-disable-next-line no-console
      console.log({ form: form.id, event: 'submit', validation })
    },
  },
]
