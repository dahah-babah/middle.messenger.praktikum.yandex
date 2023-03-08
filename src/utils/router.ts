import Router, { ROUTES } from '@/core/Router/Router'

const routeIds = ['sign-in', 'sign-up', 'chats', 'profile', 'settings-user', 'settings-pass']

const route = (id: string) => {
  switch (id) {
    case 'sign-in': {
      Router.go(ROUTES.SIGN_IN)
      break
    }

    case 'sign-up': {
      Router.go(ROUTES.SIGN_UP)
      break
    }

    case 'chats': {
      Router.go(ROUTES.MESSENGER)
      break
    }

    case 'profile': {
      Router.go(ROUTES.PROFILE)
      break
    }

    case 'settings-user': {
      Router.go(ROUTES.SETTINGS)
      break
    }

    case 'settings-pass': {
      Router.go(ROUTES.PASSWORD)
      break
    }

    default:
      Router.go(ROUTES.NOT_FOUND)
      break
  }
}

export const handleRoute = (id: string) => {
  if (routeIds.includes(id)) {
    route(id)
  }
}
