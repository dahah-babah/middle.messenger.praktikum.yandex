import { IUser } from '/api/AuthAPI'

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

export const getChildTag = (template: string): string => template.split(' ')[0].replace(/<|>/g, '')

export const getChildrenTpl = (template: string, tag: string) => {
  const childrenRegExp = new RegExp(`^(<${tag}.*?>)(.+)(</${tag}>)$`, 'gm')
  return template.replace(childrenRegExp, '$2')
}

export const clearTemplate = (template: string): string =>
  template.replace(/[\n\r\s\t]+/g, ' ').trim()

export const clearTag = (str: string): string => str.replace(/<|>/g, '').split(' ')[0]

export const isAttribute = (str: string): boolean => str.includes('=') && !str.includes('{')

export const getAttributeData = (template: string): string[] =>
  clearTag(template).replace(/['"]/g, '').split('=')

export const isProp = (str: string): boolean => !!str.match(/{\w+}/g)

export const getPropName = (str: string): string => str.replace(/{(\w+)}/g, '$1')

export const isFullAttributeValue = (str: string): boolean => !!str.match(/"(.+)"/g)

type TChildren = 'tag' | 'value' | 'component' | 'loop' | 'text' | 'if'

export const getExpressionTemplate = (childType: TChildren, template: string): string => {
  const exprRegExp = new RegExp(`^{${childType}:\\w+(.+)%${childType}}$`, 'g')
  return template.replace(exprRegExp, '$1').trim()
}

export const getMessageTime = (isoDate: string): string => {
  const date = new Date(isoDate)

  return `${date.getHours()}:${date.getMinutes()}`
}

export const getPropsValue = (state: IUser, fieldName: string): string => {
  switch (fieldName) {
    case 'email':
      return state.email
    case 'login':
      return state.login
    case 'first_name':
      return state.first_name
    case 'second_name':
      return state.second_name
    case 'display_name':
      return state.display_name
    case 'phone':
      return state.phone
    default:
      return ''
  }
}
