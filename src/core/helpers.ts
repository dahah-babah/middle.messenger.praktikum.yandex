import Component from '@/core/Component'

export const getChildren = (template: string): string[] => {
  const arr = template.trim().split(' ')

  const loopStartRegExp = /^{loop+:\w+$/g
  const loopEndRegExp = /^%loop}$/g

  const conditionStartRegExp = /^{if+:\w+$/g
  const conditionEndRegExp = /^%if}$/g

  const currentTags: string[] = []
  const result: string[] = []

  let curChild: string[] = []

  arr.forEach((elem) => {
    if (
      (elem.includes('</') && elem.includes(currentTags[currentTags.length - 1])) ||
      elem.includes('/>')
    ) {
      currentTags.pop()
    } else if (elem.includes('<')) {
      currentTags.push(elem.replace(/<|>/g, ''))
    }

    curChild.push(elem)

    if (
      currentTags.length === 0 &&
      !elem.match(loopStartRegExp) &&
      !elem.match(conditionStartRegExp)
    ) {
      let curChildStr = curChild.join(' ')

      if (loopEndRegExp.test(elem) || conditionEndRegExp.test(elem)) {
        const lastElem = result.pop()
        curChildStr = [lastElem, elem].join(' ')
      }

      result.push(curChildStr)
      curChild = []
    }
  })

  return result
}

type TProps = {
  [key: string]: string | Component<TProps>
}

type TChildren = 'tag' | 'value' | 'component' | 'loop' | 'text' | 'if'

export const getChildrenType = (template: string, props: TProps): TChildren => {
  const textRegExp = /^<.*?>([a-zа-яё]+)<\/.*?>$/gi
  const valueRegExp = /^{(.+)}$/g
  const loopRegExp = /^{loop:.+%loop}$/g
  const conditionRegExp = /^{if:.+%if}$/g

  if (loopRegExp.test(template)) {
    return 'loop'
  }

  if (conditionRegExp.test(template)) {
    return 'if'
  }

  if (valueRegExp.test(template)) {
    const name = template.trim().replace(valueRegExp, '$1')
    const value = props[name]

    if (value instanceof Component) {
      return 'component'
    }

    return 'value'
  }

  if (textRegExp.test(template.split(' ').join(''))) {
    return 'text'
  }

  return 'tag'
}

export const replaceValue = (
  template: string,
  props: TProps,
  type: TChildren,
): string | boolean | Array<{ [key: string]: string | Component<TProps> }> | Component<TProps> => {
  if (type === 'if') {
    const condition = template.replace(/^{if:(.+)%if}$/g, '$1')
    const conditionName = condition.split(' ')[0]

    return !!props[conditionName]
  }

  if (type === 'loop') {
    const loop = template.replace(/^{loop:(.+)%loop}$/g, '$1')
    const loopName = loop.split(' ')[0]

    return props[loopName]
  }

  if (type === 'text') {
    const textRegExp = /^<.*?>([a-zа-яё\s]+)<\/.*?>$/gi
    return template.replace(textRegExp, '$1').trim().split(' ').join('*')
  }

  const onlyValueRegExp = /^{(.+)}$/g
  const name = template.trim().replace(onlyValueRegExp, '$1')

  return props[name]
}

export const getChildTag = (template: string): string => template.split(' ')[0].replace(/<|>/g, '')

type TAttribute = { [key: string]: string }

export const getAttributes = (template: string, props: TAttribute): TAttribute => {
  const templateAsArray = template.split(' ')
  const attrs: TAttribute = {}

  const clearTag = (str: string) => str.replace(/<|>/g, '').split(' ')[0]
  const isAttr = (str: string) => str.includes('=') && !str.includes('{')

  for (let i = 0; i < templateAsArray.length; i += 1) {
    const [name, value] = clearTag(templateAsArray[i]).replace(/['"]/g, '').split('=')

    // если значение уже установлено, не нужно его перезаписывать
    if (attrs[name]) {
      break
    }

    if (name && value) {
      if (value.match(/{\w+}/g)) {
        const propsName = value.replace(/{(\w+)}/g, '$1')

        attrs[name] = props[propsName]
      } else {
        attrs[name] = value
      }

      const isFullValue = templateAsArray[i].match(/"(.+)"/g)

      // поиск значения для множественных значений (например, несколько классов)
      if (!isFullValue) {
        for (let j = i + 1; j < templateAsArray.length; j += 1) {
          if (templateAsArray[j].includes('>') || isAttr(templateAsArray[j])) {
            break
          }

          attrs[name] += ` ${templateAsArray[j].replace(/['"]/g, '')}`
        }
      }
    }
  }

  return attrs
}
