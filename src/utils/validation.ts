import { regExpValidation } from 'src/utils/regExp'
import Input from 'src/components/Input'

export type TField = 'name' | 'email' | 'login' | 'phone' | 'password'

type TValidationEvent = 'focus' | 'blur' | 'submit'

export const validate = (str: string, type: TField): boolean => {
  if (!str || !regExpValidation[type]) return false

  return str.search(regExpValidation[type]) > -1
}

export const validName = (name: string): string => {
  if (!name.includes('_')) return name

  return name.split('_')[1]
}

export const validationError = {
  login:
    'Логин содержит от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  email:
    'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
}

export function highlightErrors() {
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

export function validateField(target: HTMLInputElement, eventName: TValidationEvent) {
  if (!target) return

  const { value: targetValue, name: targetName } = target

  const isValid = validate(targetValue, validName(targetName) as TField)

  if (eventName !== 'focus') {
    this.setProps({ fields: getNewProps.call(this, target, isValid) })

    highlightErrors.call(this)
  }
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
