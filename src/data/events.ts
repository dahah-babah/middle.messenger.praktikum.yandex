import { TField, validate, validName } from '@/utils/validation'

export const validationEvents = [
  {
    tag: 'input',
    name: 'focus',
    callback: (event: { target: HTMLInputElement }) => {
      const { target } = event

      if (!target) return

      const { name, value } = target

      const isValid = validate(value, validName(name) as TField)
      // eslint-disable-next-line no-console
      console.log({ event: 'focus', name, value, isValid })
    },
  },
  {
    tag: 'input',
    name: 'blur',
    callback: (event: { target: HTMLInputElement }) => {
      const { target } = event

      if (!target) return

      const { name, value } = target

      const isValid = validate(value, validName(name) as TField)
      // eslint-disable-next-line no-console
      console.log({ event: 'blur', name, value, isValid })
    },
  },
  {
    tag: 'button',
    name: 'click',
    callback: (event: Event) => {
      event.preventDefault()

      const form = document.querySelector('form')
      const fields = Array.from(form?.querySelectorAll('input') || [])

      const validation = fields.map(({ name, value }) => ({
        name,
        value,
        isValid: validate(value, validName(name) as TField),
      }))

      // eslint-disable-next-line no-console
      console.log({ form: form?.id, event: 'submit', validation })
    },
  },
]
