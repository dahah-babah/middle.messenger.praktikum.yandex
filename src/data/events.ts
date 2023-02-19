import { validateField } from 'src/utils/validation'

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
