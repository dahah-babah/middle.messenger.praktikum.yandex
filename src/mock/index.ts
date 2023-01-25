const signInFields = [
  {
    id: 'login',
    type: 'email',
    name: 'email',
    label: 'Логин',
    value: 'ivanivanov',
    placeholder: 'Логин',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: 'ivanivanov',
    placeholder: 'Пароль',
  },
]

const signUpFields = [
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'Почта',
    value: 'pochta@yandex.ru',
    placeholder: 'Почта',
  },
  {
    id: 'login',
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    placeholder: 'Логин',
  },
  {
    id: 'first_name',
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    placeholder: 'Имя',
  },
  {
    id: 'second_name',
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    placeholder: 'Фамилия',
  },
  {
    id: 'phone',
    type: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
    placeholder: 'Телефон',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: 'ivanivanov',
    placeholder: 'Пароль',
  },
  {
    id: 'password_again',
    type: 'password',
    name: 'password_again',
    label: 'Пароль (еще раз)',
    value: 'ivanivanov',
    placeholder: 'Пароль (еще раз)',
  },
]

const userFields = [
  {
    name: 'email',
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'email',
  },
  {
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    type: 'text',
  },
  {
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    type: 'text',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    type: 'text',
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Иванushka',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
    type: 'phone',
  },
]

const passwords = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    value: 'ivanivanov',
    type: 'password',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    value: 'ivanivanov123',
    type: 'password',
  },
  {
    name: 'repeatPassword',
    label: 'Повторите новый пароль',
    value: 'ivanivanov123',
    type: 'password',
  },
]

export const mock = {
  signIn: {
    title: 'Вход',
    fields: signInFields,
    button: {
      type: 'submit',
      children: 'Войти',
    },
    link: {
      href: '/sign-up',
      children: 'Нет аккаунта?',
    },
  },

  signUp: {
    title: 'Регистрация',
    fields: signUpFields,
    button: {
      type: 'submit',
      children: 'Зарегистрироваться',
    },
    link: {
      href: '/sign-in',
      children: 'Войти',
    },
  },

  profile: {
    title: 'Иван',
    fields: userFields,
    changeDataLink: {
      href: '/edit',
      children: 'Изменить данные',
    },
    changePasswordLink: {
      href: '/password',
      children: 'Изменить пароль',
    },
    exitLink: {
      href: '/sign-in',
      children: 'Выйти',
    },
  },

  edit: {
    fields: userFields,
    button: {
      type: 'submit',
      children: 'Сохранить',
    },
  },

  password: {
    fields: passwords,
    button: {
      type: 'submit',
      children: 'Сохранить',
    },
  },

  chats: {},

  // 500: {
  //   code: '500',
  //   caption: 'Мы уже фиксим',
  //   link: {
  //     href: '/chats',
  //     children: 'Назад к чатам',
  //   },
  // },

  // 404: {
  //   code: '404',
  //   caption: 'Не туда попали',
  //   link: {
  //     href: '/chats',
  //     children: 'Назад к чатам',
  //   },
  // },
}
