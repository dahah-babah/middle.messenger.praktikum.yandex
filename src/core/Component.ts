import EventBus, { IEventBus } from '@/core/EventBus'
import {
  getAttributes,
  getChildren,
  getChildrenType,
  getChildTag,
  replaceValue,
} from '@/core/helpers'

export type TEvent = {
  tag: string
  name: string
  callback: (event: Event | { target: HTMLInputElement }) => void
}

interface IProps {
  [key: string]: any
}

interface IComponent extends IProps {
  events?: TEvent[]
  // attrs?: { [key: string]: string }
}

abstract class Component<T extends IComponent> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _tag: string

  _tpl: string

  _eventBus: IEventBus

  _element: HTMLElement

  _props: T

  _shouldUpdate: boolean

  protected constructor(tagName: string, props: T, tpl: string) {
    this._tag = tagName
    this._tpl = tpl
    this._shouldUpdate = false

    this._eventBus = new EventBus()
    this._props = this._makePropsProxy(props) // for child too

    this._registerEvents()
    this._eventBus.emit(Component.EVENTS.INIT)
  }

  private _registerEvents() {
    this._eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    this._eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this._eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this._eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    this._element = this._createDocumentElement()
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps)

    if (shouldUpdate) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  private _makePropsProxy(props: T) {
    return new Proxy(props, {
      deleteProperty: () => {
        throw new Error('Нет доступа')
      },

      get: (target, prop) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value
          this._shouldUpdate = true
        }

        return true
      },
    })
  }

  private _createDocumentElement(): HTMLElement {
    return document.createElement(this._tag)
  }

  private _render() {
    const component = this.render()

    this.removeEvents()
    this._element.textContent = ''
    this._element.appendChild(component)
    this.addEvents()
    // атрибуты должны вешаться после маунта компонента (не в компайле) ?
    // addAttrs
  }

  compile(
    template: string,
    tag?: string,
    props?: { [key: string]: string | Component<T> },
  ): HTMLElement {
    const rootTag = tag ?? this._tag
    const rootProps = props ?? this._props

    const clearTemplate = template.replace(/[\n\r\s\t]+/g, ' ').trim()

    const childrenRegExp = new RegExp(`^(<${rootTag}.*?>)(.+)(</${rootTag}>)$`, 'gm')
    const childrenTpl = clearTemplate.replace(childrenRegExp, '$2')

    const attrs = getAttributes(clearTemplate, rootProps)

    if (clearTemplate === childrenTpl) return this.createElement(rootTag, { ...attrs }, childrenTpl)

    const children: (HTMLElement | string)[] = []

    if (childrenTpl) {
      // для текста нужно проверять отдельно
      const textRegExp = /^[a-zа-яё\s]+$/gi
      const hasOnlyTextNode = textRegExp.test(childrenTpl)

      if (hasOnlyTextNode) {
        children.push(childrenTpl.trim())
      }

      const childrenArr = hasOnlyTextNode ? [] : getChildren(childrenTpl)

      childrenArr.forEach((childTpl) => {
        const childType = getChildrenType(childTpl, rootProps)

        const exprRegExp = new RegExp(`^{${childType}:\\w+(.+)%${childType}}$`, 'g')
        const exprTpl = childTpl.replace(exprRegExp, '$1').trim()

        const childTag = getChildTag(['loop', 'if'].includes(childType) ? exprTpl : childTpl)
        const value = replaceValue(childTpl, rootProps, childType)

        switch (childType) {
          case 'if': {
            if (value) {
              children.push(this.compile(exprTpl, childTag, { ...rootProps }))
            }
            break
          }

          case 'loop': {
            const loopData = value as Array<{ [key: string]: string | Component<T> }>

            loopData.forEach((data) => {
              const isComponent = Object.values(data)[0] instanceof Component

              if (isComponent) {
                children.push(this.compile(exprTpl, childTag, { ...data }))
              } else {
                children.push(this.compile(exprTpl, childTag, data))
              }
            })

            break
          }

          case 'component': {
            if (value instanceof Component) {
              children.push(value.render())
            }
            break
          }

          case 'value': {
            children.push(value as string)
            break
          }

          case 'tag':
          default: {
            children.push(this.compile(childTpl, childTag, { ...rootProps }))
            break
          }
        }
      })
    }

    // console.log(this.createElement(rootTag, { ...attrs }, children), children)
    return this.createElement(rootTag, { ...attrs }, children)
  }

  createElement(
    tag: string,
    attrs: { [key: string]: string },
    ...children: HTMLElement[] | Text[]
  ): HTMLElement {
    const element = document.createElement(tag)

    Object.entries(attrs || {}).forEach(([name, value]) => {
      element.setAttribute(name, value)
    })

    children.forEach((child) => this.appendChild(element, child))

    return element
  }

  appendChild(parent: HTMLElement, child: Node) {
    if (Array.isArray(child)) {
      child.forEach((nestedChild) => this.appendChild(parent, nestedChild))
    } else {
      parent.appendChild(child?.nodeType ? child : document.createTextNode(child))
    }
  }

  get element(): HTMLElement {
    return this._element
  }

  getContent(): HTMLElement {
    return this.element
  }

  setProps(nextProps: T) {
    if (!nextProps) {
      return
    }

    this._shouldUpdate = false

    const oldProps = { ...this._props }

    if (Object.values(nextProps).length) {
      Object.assign(this._props, nextProps)
    }

    if (this._shouldUpdate) {
      this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps, this._props)
      this._shouldUpdate = false
    }
  }

  // addAttributes() {
  //   const { attrs = {} } = this._props
  //
  //   Object.entries(attrs).forEach(([key, value]) => {
  //     this._element.setAttribute(key, value)
  //   })
  // }

  addEvents() {
    const { events = [] } = this._props

    events.map(({ name, tag, callback }) =>
      this._element.querySelectorAll(tag).forEach((elem) => elem.addEventListener(name, callback)),
    )
  }

  removeEvents() {
    const { events = [] } = this._props

    events.map(({ name, tag, callback }) =>
      this._element
        .querySelectorAll(tag)
        .forEach((elem) => elem.removeEventListener(name, callback)),
    )
  }

  init() {
    this._createResources()
    this._eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM)
  }

  componentDidUpdate(oldProps: T, newProps: T): boolean {
    return true
  }

  abstract componentDidMount(): void

  abstract render(): HTMLElement
}

export default Component
