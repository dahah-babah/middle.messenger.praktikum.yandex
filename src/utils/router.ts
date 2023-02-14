// eslint-disable-next-line import/no-cycle
import { router, ROUTES } from '/index'

const routeIds = ['sign-in', 'sign-up', 'chats', 'profile', 'settings-user', 'settings-pass']

const route = (id: string) => {
  switch (id) {
    case 'sign-in': {
      router.go(ROUTES.SIGN_IN)
      break
    }

    case 'sign-up': {
      router.go(ROUTES.SIGN_UP)
      break
    }

    case 'chats': {
      router.go(ROUTES.MESSENGER)
      break
    }

    case 'profile': {
      router.go(ROUTES.PROFILE)
      break
    }

    case 'settings-user':
    case 'settings-pass': {
      router.go(ROUTES.SETTINGS)
      break
    }

    default:
      router.go(ROUTES.NOT_FOUND)
      break
  }
}

export const handleRoute = (id: string) => {
  if (routeIds.includes(id)) {
    route(id)
  }
}
