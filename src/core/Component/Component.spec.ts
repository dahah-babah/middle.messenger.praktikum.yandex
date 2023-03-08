import { Component } from '@/core/Component'
import Button from '@/components/Button'

interface IItem {
  id: number
  caption: string
}

interface IProps {
  title: string
  text: string
  label?: string
  list?: IItem[]
  button?: Button
  name?: string
}

const pageTpl = `<div> <h1> {title} </h1> <p> {text} </p> </div>`
const pageTag = 'div'

class Page extends Component<IProps> {
  constructor(props: IProps) {
    super(pageTag, props, pageTpl)
  }

  render() {
    return this.compile(pageTpl)
  }
}

describe('Component', () => {
  const title = 'This is title'
  const text = 'This is text'

  const pageProps = { title, text }

  let component: Page

  beforeAll(() => {
    component = new Page(pageProps)
  })

  describe('Initial state', () => {
    test('Class fields should be correct', () => {
      const { tag, tpl, props, element } = component

      const compiledTpl = '<div><div><h1>This is title</h1><p>This is text</p></div></div>'

      expect(tag).toEqual(pageTag)
      expect(tpl).toEqual(pageTpl)
      expect(props).toEqual(pageProps)
      expect(element.outerHTML).toBe(compiledTpl)
    })
  })

  describe('Attributes', () => {
    const attrs = { id: 'rootId', class: 'root' }

    test('Should return object with attributes - without props', () => {
      const tpl = `<div id="rootId" class="root"> Test </div>`

      expect(component.getAttributes(tpl, {})).toEqual(attrs)
    })

    test('Should return object with attributes - with props', () => {
      const tpl = `<div id="{id}" class="{class}"> Test </div>`

      expect(component.getAttributes(tpl, attrs)).toEqual(attrs)
    })
  })

  describe('Props', () => {
    test('Props should be changed', () => {
      component.setProps({ title: 'new title' })

      expect(component.props.title).toEqual('new title')
      expect(component.props.text).toEqual('This is text')
    })
  })

  describe('Template', () => {
    beforeAll(() => {
      component.setProps({ title, text })
    })

    describe('Conditional block', () => {
      const conditionalTpl = `
        <div class="root"> 
          {if:label
            <div class="label"> {label} </div>
          %if} 
        </div>
      `

      test('Should return empty block', () => {
        const result = '<div class="root"></div>'
        const element = component.compile(conditionalTpl)

        expect(element.outerHTML).toEqual(result)
      })

      test('Should return block with text', () => {
        const result = '<div class="root"><div class="label">Label</div></div>'

        component.setProps({ label: 'Label' })

        const element = component.compile(conditionalTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })

    describe('Loop block', () => {
      const loopTpl = `
        <div id="root">
          <ul id="list"> 
            {loop:list
              <li id="{id}" class="field"> {caption} </li>
            %loop} 
          </ul>
        </div>
      `

      test('Should return empty block', () => {
        const result = '<div id="root"><ul id="list"></ul></div>'
        const element = component.compile(loopTpl)

        expect(element.outerHTML).toEqual(result)
      })

      test('Should return block with list', () => {
        const result = `<div id="root"><ul id="list"><li id="1" class="field">One</li><li id="2" class="field">Two</li></ul></div>`

        const list = [
          { id: 1, caption: 'One' },
          { id: 2, caption: 'Two' },
        ]

        component.setProps({ list })

        const element = component.compile(loopTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })

    describe('Nested component', () => {
      const buttonTpl = `
        <div id="root"> {button} </div>
      `

      test('Should return empty block', () => {
        const result = '<div id="root"></div>'
        const element = component.compile(buttonTpl)

        expect(element.outerHTML).toEqual(result)
      })

      test('Should return block with nested button', () => {
        const result = `<div id="root"><div><button type="submit" class="button primary">Button</button></div></div>`

        const button = new Button({ type: 'submit', children: 'Button' })

        component.setProps({ button })

        const element = component.compile(buttonTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })

    describe('Value from props', () => {
      const valueTpl = `
        <div id="root"> {name} </div>
      `

      test('Should return empty block', () => {
        const result = '<div id="root"></div>'
        const element = component.compile(valueTpl)

        expect(element.outerHTML).toEqual(result)
      })

      test('Should return block with passed value', () => {
        const result = `<div id="root">Name</div>`

        component.setProps({ name: 'Name' })

        const element = component.compile(valueTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })

    describe('Nested tags', () => {
      const nestedTpl = `
        <div id="root">
          <h1> {title} </h1>
          <p> {text} <b> Bold text </b> </p>
        </div>
      `

      test('Should return block with passed values', () => {
        const result = `<div id="root"><h1>This is title</h1><p>This is text<b>Bold text</b></p></div>`

        const element = component.compile(nestedTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })

    describe('Simple text', () => {
      const textTpl = ` <div id="root"> Just some text </div>`

      test('Should return block with text', () => {
        const result = `<div id="root">Just some text</div>`

        const element = component.compile(textTpl)

        expect(element.outerHTML).toEqual(result)
      })
    })
  })
})
