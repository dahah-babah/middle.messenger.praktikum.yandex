export const regExpProps = {
  loop: /^{loop:.+%loop}$/g,
  text: /^<.*?>([a-zа-яё]+)<\/.*?>$/gi,
  value: /^{(.+)}$/g,
  condition: /^{if:.+%if}$/g,
}

export const regExpSubstitution = {
  loop: /^{loop:(.+)%loop}$/g,
  text: /^<.*?>([a-zа-яё\s]+)<\/.*?>$/gi,
  value: /^{(.+)}$/g,
  condition: /^{if:(.+)%if}$/g,
}

export const regExpValidation = {
  name: /^[A-ZА-Я]([a-zа-я]+)(-?)([a-zа-я]+)$/g,
  phone: /^([\d]|\+)[\d]{9,14}$/g,
  email: /^\w+([\\.-]?\w+)*@\w+(\.\w{2,3})+$/g,
  login: /^(?![\d_-]+$)([\w_-]{3,20})$/g,
  password: /^(?=.*[\d])(?=.*[A-Z])[\w\d]{8,40}$/g,
  message: /\w/g,
}
