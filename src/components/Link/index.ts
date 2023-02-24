import Component, { TEvent } from 'src/core/Component'
import LinkTpl from 'src/components/Link/template'

interface IProps {
  id: string
  children: string
  events?: TEvent[]
}

class Link extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, LinkTpl)
  }

  componentDidMount(): void {}

  render() {
    return this.compile(LinkTpl)
  }
}

export default Link
