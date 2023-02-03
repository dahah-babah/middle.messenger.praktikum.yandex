import { regExpValidation } from '@/utils/regExp'

export type TField = 'name' | 'email' | 'login' | 'phone' | 'password'

export const validate = (str: string, type: TField): boolean => {
  if (!str || !regExpValidation[type]) return false

  return str.search(regExpValidation[type]) > -1
}

export const validName = (name: string): string => {
  if (!name.includes('_')) return name

  return name.split('_')[1]
}
