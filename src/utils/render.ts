import Component from '@/core/Component'

const render = (query: string, component: Component<{}>) => {
  const root = document.querySelector(query) as HTMLElement

  if (root === null) {
    throw new Error(`Element not found by selector ${query}`)
  }

  root.appendChild(component.getContent())

  component.dispatchComponentDidMount()

  return root
}

export default render
