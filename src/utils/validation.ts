import { regExpValidation } from 'src/utils/regExp'

export type TField = 'name' | 'email' | 'login' | 'phone' | 'password'

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
