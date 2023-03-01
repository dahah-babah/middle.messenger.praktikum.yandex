import InputTpl from '@/components/Input/template'
import Component from '@/core/Component'

export type TInputType = 'text' | 'email' | 'password' | 'phone'

interface IProps {
  id: string
  type: TInputType
  name: string
  value: string | number
  placeholder: string
  label?: string
  error?: string
}

class Input extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, InputTpl)
  }

  render() {
    return this.compile(InputTpl)
  }
}

export default Input
