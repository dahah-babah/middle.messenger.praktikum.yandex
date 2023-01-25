import Component from '@/core/Component'

export const getChildren = (template: string): string[] => {
  const arr = template.trim().split(' ')

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

    if (currentTags.length === 0) {
      const curChildStr = curChild.join(' ')

      result.push(curChildStr)
      curChild = []
    }
  })

  return result
}

type TProps = {
  [key: string]: string | Component<TProps>
}

type TChildren = 'tag' | 'value' | 'component'

export const getChildrenType = (template: string, tag: string, props: TProps): TChildren => {
  const hasOnlyPropRegExp = new RegExp(`^(<${tag}.*?>)\\s{(\\w+)}\\s(</${tag}>)$`, 'g')
  const onlyValueRegExp = /^{(.+)}$/g

  if (template.match(onlyValueRegExp)) {
    const name = template.trim().replace(onlyValueRegExp, '$1')
    const value = props[name]

    if (value instanceof Component) {
      return 'component'
    }

    return 'value'
  }

  // console.log(template, template.match(hasOnlyPropRegExp))

  return 'tag'
}

export const replacePropValue = (template: string, props: TProps): string | Component<TProps> => {
  const onlyValueRegExp = /^{(.+)}$/g
  const name = template.trim().replace(onlyValueRegExp, '$1')

  return props[name]
}
