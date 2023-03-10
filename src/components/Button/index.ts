import Component from 'src/core/Component'
import ButtonTpl from 'src/components/Button/template'

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
