import { Component } from '@/core/Component'
import ButtonTpl from '@/components/Button/template'

interface IProps {
  type: string
  children: string
}

class Button extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ButtonTpl)
  }

  render() {
    return this.compile(ButtonTpl, 'button')
  }
}

export default Button
