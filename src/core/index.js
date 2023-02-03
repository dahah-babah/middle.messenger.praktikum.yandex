import { getChildren } from './helpers'

const Core = {
    compile: (template, data) => {
        template = template.replace(/[\n\r\s\t]+/g, ' ').trim()

        const templateAsArray = template.split(' ')

        const clearTag = str => str.replace(/<|>/g, '').split(' ')[0]
        const isClosingTag = tag => tag.includes('/')
        const isAttr = str => str.includes('=') && !str.includes('{')

        const rootTag = { open: templateAsArray[0], close: templateAsArray[templateAsArray.length - 1] }

        const tag = clearTag(rootTag.open)

        if (!isClosingTag(rootTag.close)) {
            throw new Error(`Tag ${rootTag.open} should be closed`)
        }

        const props = { }

        for (let i = 0; i < templateAsArray.length; i++) {
            const [name, value] = clearTag(templateAsArray[i]).replace(/['"]/g, '').split('=')

            if (props[name]) {
                break
            }

            if (templateAsArray[i].includes('>') && value) {
                props[name] = value
                break
            }

            if (isAttr(templateAsArray[i]) && value) {
                const isFullValue = templateAsArray[i].match(/"(.+)"/g)

                if (isFullValue) {
                    props[name] = value
                } else {
                    // вычленение значения для множественных значений (например, несколько классов)
                    props[name] = value

                    for (let j = i + 1; j < templateAsArray.length; j++) {
                        if (templateAsArray[j].includes('>') || isAttr(templateAsArray[j])) {
                            break
                        }

                        props[name] += ` ${templateAsArray[j].replace(/['"]/g, '')}`
                    }
                }
            }
        }

        const childrenRegExp = new RegExp(`^(<${tag}.*?>)([\\s\\S]*?)(<\/${tag}>)$`, 'g')
        const childrenTpl = template.replace(childrenRegExp, '$2')

        if (template === childrenTpl) return Core.createElement(tag, props, template) // for self-closed tags

        // проверка на наличие в чилдренах только значения для подстановки вида: {title}
        const onlyValueRegExp = new RegExp(`^\\{(.+)\\}$`, 'g')
        // проверка на наличие в чилдренах только текста
        const onlyTextRegExp = new RegExp(`^([\\wа-я\\W][^<>{}]+)$`, 'ig')
        // пока цикл это только fields -> нужна проверка на название массива из data, искать его в childrenTpl
        const cycleRegExp = new RegExp(`^{for\\s(\\w+)\\sin\\s(fields)(.+)%}$`, 'g')
        // поиск пропов вида: проп={} / {} -> нужен для поиска имен пропсов в компонентах
        const propInAttrRegExp = new RegExp(`^.*{(\\w+)}.*$`, 'g')
        // поиск компонентов по ключевому слову set
        const component = '{set\\s(\\w+)\\sin\\s(<[\\w|\\s|=|"|{|}]+>[\\s|\\w|{|}]+<\\/[\\w|\\s|=|"|{|}]+>)\\s%}'
        const componentRegExp = new RegExp(component, 'g')
        const startsWithComponentRegExp = new RegExp(`^${component}`, 'g')

        let children = []

        if (childrenTpl) {
            const hasOnlyProp = childrenTpl.trim().match(onlyValueRegExp)
            const hasOnlyText = childrenTpl.trim().match(onlyTextRegExp)
            const hasCycle = childrenTpl.trim().match(cycleRegExp)
            const hasComponent = childrenTpl.trim().match(startsWithComponentRegExp)

            if (hasComponent) {
                const matches = childrenTpl.trim().matchAll(componentRegExp)

                let parsedChildren = []


                for (let match of matches) {
                    const prop = match[1]
                    const tpl = match[2]
                    const values = data[prop]

                    let tplAsArray = tpl.split(' ')

                    for (let i = 0; i < tplAsArray.length; i++) {
                        const propInAttr = tplAsArray[i].replace(propInAttrRegExp, '$1')

                        if (propInAttr === tplAsArray[i]) {
                            continue
                        }

                        tplAsArray[i] = tplAsArray[i].replace(/{\w+}/g, values[propInAttr])
                    }

                    parsedChildren.push(tplAsArray.join(' '))
                }

                for (let i = 0; i < parsedChildren.length; i++) {
                    children.push(Core.compile(parsedChildren[i], data))
                }
            } else if (hasCycle) {
                const prop = childrenTpl.trim().replace(cycleRegExp, '$2')
                const child = childrenTpl.trim().replace(cycleRegExp, '$3')

                const array = data[prop]

                let parsedChildren = new Array(array.length)

                for (let i = 0; i < array.length; i++) {
                    let childAsArray = child.trim().split(' ')

                    for (let j = 0; j < childAsArray.length; j++) {
                        const propInAttr = childAsArray[j].replace(propInAttrRegExp, '$1')

                        if (propInAttr === childAsArray[j]) {
                            continue
                        }

                        childAsArray[j] = childAsArray[j].replace(/{\w+}/g, array[i][propInAttr])
                    }

                    parsedChildren[i] = childAsArray.join(' ')
                }

                for (let i = 0; i < parsedChildren.length; i++) {
                    children.push(Core.compile(parsedChildren[i], data))
                }
            } else if (hasOnlyText) {
                const text = childrenTpl.trim().replace(onlyValueRegExp, '$1')
                return Core.createElement(tag, props, text)
            } else if (hasOnlyProp) {
                const propValue = childrenTpl.trim().replace(onlyValueRegExp, (str) => `${data[str.slice(1, -1)]}`)
                return Core.createElement(tag, props, propValue)
            } else {
                const childrenArr = getChildren(childrenTpl)

                for (let i = 0; i < childrenArr.length; i++) {
                    children.push(Core.compile(childrenArr[i], data))
                }
            }
        }

        return Core.createElement(tag, props, children)
    },

    createElement: (tag, props, ...children) => {
        const element = document.createElement(tag)

        Object.entries(props || {}).forEach(([name, value]) => {
            if (name.startsWith('on') && window.hasOwnProperty(name.toLowerCase())) {
                element.addEventListener(name.toLowerCase().slice(2), value)
            } else {
                element.setAttribute(name, value.toString())
            }
        })

        children.forEach(child => Core.appendChild(element, child))

        return element
    },

    appendChild: (parent, child) => {
        if (Array.isArray(child)) {
            child.forEach(nestedChild => Core.appendChild(parent, nestedChild))
        } else {
            parent.appendChild(child?.nodeType ? child : document.createTextNode(child))
        }
    },
}

export default Core
