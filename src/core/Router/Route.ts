import Component, { TConstructable, IComponent } from '@/core/Component'
import render from '@/utils/render'

class Route {
  _pathname: string

  _componentClass: TConstructable

  _component: null | Component<IComponent>

  _props: IComponent

  constructor(pathname: string, view: TConstructable, props = {}) {
    this._pathname = pathname
    this._componentClass = view
    this._component = null
    this._props = props
  }

  leave() {
    if (this._component) {
      this._component.clear()
      this._component = null
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._component) {
      this._component = new this._componentClass(this._props)

      if (this._component) {
        render(this._props.rootQuery, this._component)
      }
    }
  }
}

export default Route
