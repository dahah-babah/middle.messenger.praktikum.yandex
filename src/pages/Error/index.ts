import Component, { TEvent } from 'src/core/Component'
import Link from 'src/components/Link'
import ErrorTpl from 'src/pages/Error/template'

interface IProps {
  code: string
  caption: string
  link: Link
  events: TEvent[]
}

class Error extends Component<IProps> {
  constructor(props: IProps) {
    super('section', props, ErrorTpl)
  }

  render() {
    return this.compile(ErrorTpl)
  }
}

export default Error
