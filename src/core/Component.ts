import EventBus, { IEventBus } from '@/core/EventBus'
import {
    getAttributes,
    getChildren,
    getChildrenType,
    getChildTag,
    replaceValue,
} from '@/core/helpers'

export default class Component<T extends {}> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    _element: HTMLElement

    _tag: string

    _tpl: string

    _i: number

    props: T

    eventBus: IEventBus

    constructor(tagName: string, props: T, tpl: string) {
        const eventBus = new EventBus()

        this._tag = tagName
        this._tpl = tpl

        this._i = 0

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

    _componentDidMount() {
        this.componentDidMount()
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const shouldUpdate = this.componentDidUpdate(oldProps, newProps)

        if (shouldUpdate) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER, {})
        }
    }

    _makePropsProxy(props: T) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        // console.log(props)
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('Нет доступа')
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

    _render() {
        const component = this.render()

        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду

        // this.removeEvents()
        this._element = component
        // addEvents
        // addAttrs
    }

    compile(template: string, tag?: string, props?: T) {
        this._i += 1

        const rootTag = tag ?? this._tag
        const rootProps = props ?? this.props

        const clearTemplate = template.replace(/[\n\r\s\t]+/g, ' ').trim()

        const childrenRegExp = new RegExp(`^(<${rootTag}.*?>)(.+)(</${rootTag}>)$`, 'gm')
        const childrenTpl = clearTemplate.replace(childrenRegExp, '$2')

        const attrs = getAttributes(clearTemplate, rootProps)

        if (clearTemplate === childrenTpl)
            return this.createElement(rootTag, { ...attrs }, childrenTpl)

        const children: HTMLElement[] | Text[] = []

        if (childrenTpl) {
            // для текста нужно проверять отдельно
            const textRegExp = /^[a-zа-яё\s]+$/gi
            const hasOnlyTextNode = textRegExp.test(childrenTpl)

            if (hasOnlyTextNode) {
                children.push(childrenTpl.trim())
            }

            const childrenArr = hasOnlyTextNode ? [] : getChildren(childrenTpl)
            // console.log(childrenArr)

            childrenArr.forEach((childTpl) => {
                const childType = getChildrenType(childTpl, rootProps)
                const loopTpl = childTpl.replace(/^{loop:\w+(.+)%loop}$/g, '$1').trim()
                const childTag = getChildTag(childType === 'loop' ? loopTpl : childTpl)

                switch (childType) {
                    case 'loop': {
                        const values = replaceValue(childTpl, rootProps, 'loop')
                        const hasComponent = Object.values(values[0]).every(
                            (value) => value instanceof Component,
                        )

                        values.forEach((value) => {
                            if (hasComponent) {
                                children.push(this.compile(loopTpl, childTag, { ...value }))
                            } else {
                                children.push(this.compile(loopTpl, childTag, value))
                            }
                        })

                        break
                    }

                    case 'component': {
                        const value = replaceValue(childTpl, rootProps)
                        children.push(value.render())
                        break
                    }

                    case 'value': {
                        const value = replaceValue(childTpl, rootProps)
                        children.push(value)
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
    ) {
        const element = document.createElement(tag)

        // console.log(tag, attrs, children)

        Object.entries(attrs || {}).forEach(([name, value]) => {
            // if (
            //   name.startsWith('on') &&
            //   Object.prototype.hasOwnProperty.call(window, name.toLowerCase())
            // ) {
            //   element.addEventListener(name.toLowerCase().slice(2), value)
            // } else {
            element.setAttribute(name, value.toString())
            // }
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

    get element() {
        return this._element
    }

    getContent() {
        // console.log(this.element)
        return this.element
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)

        this.eventBus().emit(Component.EVENTS.FLOW_CDU, this.props, nextProps)
    }

    init() {
        this._createResources()
        // console.log(this.eventBus)
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER, {})
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: T) {}

    dispatchComponentDidMount() {}

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: T, newProps: T) {
        if (oldProps === newProps) {
            return false
        }

        // this._render()
        return true
    }

    render() {}
}
