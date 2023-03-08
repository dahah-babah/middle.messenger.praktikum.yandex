import EventBus, { IEventBus } from '@/core/EventBus'
import {
  clearTemplate,
  getAttributeData,
  getChildren,
  getChildrenTpl,
  getChildTag,
  getExpressionTemplate,
  getPropName,
  isAttribute,
  isFullAttributeValue,
  isProp,
} from '@/utils/helpers'
import { regExpProps, regExpSubstitution } from '@/utils/regExp'

type TChildren = 'tag' | 'value' | 'component' | 'loop' | 'text' | 'if'

export type TEvent = {
  tag: string
  name: string
  callback: (event: Event) => void
}

export interface IComponent {
  [key: string]: any
  events?: TEvent[]
}

export type TConstructable = {
  new (props: {}): any
}

export abstract class Component<T extends IComponent> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  tag: string

  tpl: string

  eventBus: IEventBus

  element: HTMLElement

  props: IComponent

  shouldUpdate: boolean

  protected constructor(tagName: string, props: T, tpl: string) {
    this.tag = tagName
    this.tpl = tpl
    this.shouldUpdate = false

    this.eventBus = new EventBus()
    this.props = this.makePropsProxy(props)

    this.registerEvents()
    this.eventBus.emit(Component.EVENTS.INIT)
  }

  private registerEvents() {
    this.eventBus.on(Component.EVENTS.INIT, this._init.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private createResources() {
    this.element = this.createDocumentElement()
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps)

    if (shouldUpdate) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  private makePropsProxy(props: IComponent) {
    return new Proxy(props, {
      deleteProperty: () => {
        throw new Error('Нет доступа')
      },

      get: (target, prop: string) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set: (target, prop: string, value) => {
        if (target[prop] !== value) {
          // eslint-disable-next-line no-param-reassign
          target[prop] = value

          this.shouldUpdate = true
        }

        return true
      },
    })
  }

  private createDocumentElement(): HTMLElement {
    return document.createElement(this.tag)
  }

  private _render() {
    if (!this.element) return

    const component = this.render()

    this.removeEvents()
    this.element.textContent = ''
    this.element.appendChild(component)
    this.addEvents()
  }

  private _init() {
    this.init()

    this.createResources()
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
  }

  compile(
    template: string,
    tag?: string,
    props?: { [key: string]: string | Component<T> },
  ): HTMLElement {
    const rootTag = tag ?? this.tag
    const rootProps = props ?? this.props

    const clearedTemplate = clearTemplate(template)
    const childrenTpl = getChildrenTpl(clearedTemplate, rootTag)
    const attrs = this.getAttributes(clearedTemplate, rootProps)

    if (clearedTemplate === childrenTpl)
      return this.createElement(rootTag, { ...attrs }, [childrenTpl])

    const children: (HTMLElement | string)[] = []

    if (childrenTpl) {
      // для текста нужно проверять отдельно
      const textRegExp = /^[a-zа-яё\s]+$/gi
      const hasOnlyTextNode = childrenTpl.match(textRegExp)

      if (hasOnlyTextNode) {
        children.push(childrenTpl.trim())
      }

      const childrenArr = hasOnlyTextNode ? [] : getChildren(childrenTpl)

      childrenArr.forEach((childTpl) => {
        const childType = this.getChildrenType(childTpl, rootProps)
        const exprTpl = getExpressionTemplate(childType, childTpl)
        const childTag = getChildTag(['loop', 'if'].includes(childType) ? exprTpl : childTpl)
        const value = this.replaceValue(childTpl, rootProps, childType)

        switch (childType) {
          case 'if': {
            if (value) {
              children.push(this.compile(exprTpl, childTag, { ...rootProps }))
            }
            break
          }

          case 'loop': {
            if (!value) break

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
              children.push(value.getContent())
            }
            break
          }

          case 'value': {
            if (value == null) {
              children.push('')
            } else {
              children.push(value.toString())
            }
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

    return this.createElement(rootTag, { ...attrs }, children)
  }

  createElement(
    tag: string,
    attrs: { [key: string]: string },
    children: (HTMLElement | string)[],
  ): HTMLElement {
    const element = document.createElement(tag)

    Object.entries(attrs || {}).forEach(([name, value]) => {
      element.setAttribute(name, value)
    })

    Array.from(children).forEach((child) => this.appendChild(element, child))

    return element
  }

  appendChild(parent: HTMLElement, child: Node | string) {
    if (Array.isArray(child)) {
      child.forEach((nestedChild) => this.appendChild(parent, nestedChild))
    } else {
      parent.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
    }
  }

  getChildrenType(template: string, props: IComponent): TChildren {
    if (template.match(regExpProps.loop)) {
      return 'loop'
    }

    if (template.match(regExpProps.condition)) {
      return 'if'
    }

    if (template.match(regExpProps.value)) {
      const name = template.trim().replace(regExpProps.value, '$1')
      const value = props[name]

      if (value instanceof Component) {
        return 'component'
      }

      return 'value'
    }

    if (template.split(' ').join('').match(regExpProps.text)) {
      return 'text'
    }

    return 'tag'
  }

  replaceValue(
    template: string,
    props: IComponent,
    type: TChildren,
  ):
    | string
    | boolean
    | Component<IComponent>
    | Array<{ [key: string]: string | Component<IComponent> }> {
    if (type === 'if') {
      const condition = template.replace(regExpSubstitution.condition, '$1')
      const conditionName = condition.split(' ')[0]

      return !!props[conditionName]
    }

    if (type === 'loop') {
      const loop = template.replace(regExpSubstitution.loop, '$1')
      const loopName = loop.split(' ')[0]

      return props[loopName]
    }

    if (type === 'text') {
      return template.replace(regExpSubstitution.text, '$1').trim().split(' ').join('*')
    }

    const name = template.trim().replace(regExpSubstitution.value, '$1')

    return props[name]
  }

  getAttributes(template: string, props: IComponent): IComponent {
    const templateAsArray = template.split(' ')
    const attrs: IComponent = {}

    for (let i = 0; i < templateAsArray.length; i += 1) {
      const [name, value] = getAttributeData(templateAsArray[i])

      // если значение уже установлено, не нужно его перезаписывать
      if (attrs[name]) {
        break
      }

      if (name && value) {
        if (isProp(value)) {
          attrs[name] = props[getPropName(value)]
        } else {
          attrs[name] = value
        }

        // поиск значения для множественных значений (например, несколько классов)
        if (!isFullAttributeValue(templateAsArray[i])) {
          for (let j = i + 1; j < templateAsArray.length; j += 1) {
            if (templateAsArray[j].includes('>') || isAttribute(templateAsArray[j])) {
              break
            }

            attrs[name] += ` ${templateAsArray[j].replace(/['"]/g, '')}`
          }
        }
      }
    }

    return attrs
  }

  getContent(): HTMLElement {
    return this.element
  }

  setProps(nextProps: IComponent) {
    if (!nextProps) {
      return
    }

    this.shouldUpdate = false

    const oldProps = { ...this.props }

    if (Object.values(nextProps).length) {
      Object.assign(this.props, nextProps)
    }

    if (this.shouldUpdate) {
      const args = [oldProps, this.props]

      this.eventBus.emit(Component.EVENTS.FLOW_CDU, args)
      this.shouldUpdate = false
    }
  }

  addEvents() {
    const { events = [] } = this.props

    events.map(({ name, tag, callback }) =>
      this.element.querySelectorAll(tag).forEach((elem) => elem.addEventListener(name, callback)),
    )
  }

  removeEvents() {
    const { events = [] } = this.props

    events.map(({ name, tag, callback }) =>
      this.element
        .querySelectorAll(tag)
        .forEach((elem) => elem.removeEventListener(name, callback)),
    )
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENTS.FLOW_CDM)
  }

  componentDidUpdate(oldProps: IComponent, newProps: IComponent): boolean {
    return oldProps !== newProps
  }

  clear() {
    this.element.remove()
  }

  init(): void {}

  componentDidMount(): void {}

  abstract render(): HTMLElement
}
