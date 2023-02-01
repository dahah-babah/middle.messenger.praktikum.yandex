export type TField = 'name' | 'email' | 'login' | 'phone' | 'password'

const regExps = {
  name: /^[A-ZА-Я]([a-zа-я]+)(-?)([a-zа-я]+)$/g,
  phone: /^([\d]|\+)[\d]{9,14}$/g,
  email: /^\w+([\\.-]?\w+)*@\w+(\.\w{2,3})+$/g,
  login: /^((?!^[\d_-]+$))([\w\d_-]{3,20})$/g,
  password: /^(?=.*[\d])(?=.*[A-Z])[\w\d]{8,40}$/g,
}

export const validate = (str: string, type: TField): boolean => {
  if (!str || !regExps[type]) return false

  return str.search(regExps[type]) > -1
}

export const validName = (name: string): string => {
  if (!name.includes('_')) return name

  return name.split('_')[1]
}
