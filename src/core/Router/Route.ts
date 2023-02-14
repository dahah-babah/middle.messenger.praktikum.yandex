import Component, { IComponent } from 'src/core/Component'
import render from 'src/utils/render'

class Route {
  _pathname: string

  _componentClass: new (props: {}) => Component<IComponent>

  _component: null | Component<IComponent>

  _props: IComponent

  constructor(pathname: string, view: new (props: {}) => Component<IComponent>, props = {}) {
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
