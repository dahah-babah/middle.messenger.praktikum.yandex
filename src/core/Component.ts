import EventBus, { IEventBus } from '@/core/EventBus'

export default class Component<T extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  props: T

  eventBus: IEventBus

  _element: HTMLElement

  _tag: string

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus()

    this._tag = tagName
    this.props = this._makePropsProxy(props) // for child too

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Component.EVENTS.INIT)
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  _createResources() {
    this._element = this._createDocumentElement(this._tag)
  }

  init() {
    this._createResources()
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
  }

  _componentDidMount() {
    this.componentDidMount()
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: T) {}

  dispatchComponentDidMount() { }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps)
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: T, newProps: T) {
    if (oldProps === newProps) {
      return false
    }

    this._render()
    return true
  }

  setProps = (nextProps: T) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)

    this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _render() {
    const Component = this.render()
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = Component
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element
  }

  _makePropsProxy(props: T) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    return new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа')
      },

      set(target, prop, value) {
        target[prop] = value

        return true
      },
    })
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'Component'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
