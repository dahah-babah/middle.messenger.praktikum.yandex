import Router, { ROUTES } from '@/core/Router/Router'

import Chats from '@/pages/Chats'
import SignIn from '@/pages/Auth/SignIn'
import NotFound from '@/pages/Error/NotFound'

describe('Router', () => {
  describe('Initial state should be empty', () => {
    test('Routes should be empty', () => {
      const { routes } = Router

      expect(routes).toHaveLength(0)
    })

    test('History should be empty', () => {
      const { history } = Router

      expect(JSON.stringify(history)).toBe('{}')
    })
  })

  describe('Routing', () => {
    beforeAll(() => {
      const root = document.createElement('div')

      root.setAttribute('id', 'root')

      document.body.appendChild(root)

      window.history.pushState = jest.fn()

      // @ts-ignore
      window.history.pushState.mockImplementation((state: unknown, title: string, url: string) => {
        const location = { pathname: url }

        jest.spyOn(window, 'location', 'get').mockReturnValue({
          ...window.location,
          ...location,
        })
      })

      Router.use(ROUTES.SIGN_IN, SignIn)
        .use(ROUTES.MESSENGER, Chats)
        .use(ROUTES.NOT_FOUND, NotFound)
        .start()
    })

    test.each(['/', '/messenger', '/unknown'])('Pathname should be %s', (path) => {
      Router.go(path)

      expect(window.history.pushState).toBeCalledWith({}, '', path)
      expect(window.location.pathname).toEqual(path)
    })
  })
})
