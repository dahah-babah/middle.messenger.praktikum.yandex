import Route from '@/core/Router/Route'
import { TConstructable } from '@/core/Component'

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

  private currentRoute: null | Route

  private readonly rootQuery: string

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance
    }

    this.routes = []
    this.history = window.history
    this.currentRoute = null
    this.rootQuery = rootQuery

    Router.instance = this
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }

  use(pathname: string, component: TConstructable) {
    const route = new Route(pathname, component, { rootQuery: this.rootQuery })

    this.routes.push(route)

    return this
  }

  start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window

      this.onRoute(target.location.pathname)
    }

    this.onRoute(window.location.pathname)
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this.onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }
}

export default new Router('#root')
