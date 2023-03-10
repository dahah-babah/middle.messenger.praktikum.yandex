import Route from 'src/core/Router/Route'
import { TConstructable } from 'src/core/Component'

export enum ROUTES {
  SIGN_IN = '/',
  SIGN_UP = '/sign-up',
  PROFILE = '/settings',
  SETTINGS = '/settings/edit',
  PASSWORD = '/settings/password',
  MESSENGER = '/messenger',
  NOT_FOUND = '/404',
  SERVER_ERROR = '/500',
}

class Router {
  static instance: Router

  routes: Route[]

  history: History

  _currentRoute: null | Route

  _rootQuery: string

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.instance = this
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route

    route.render()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }

  use(pathname: string, component: TConstructable) {
    const route = new Route(pathname, component, { rootQuery: this._rootQuery })

    this.routes.push(route)

    return this
  }

  start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }
}

export default new Router('#root')
