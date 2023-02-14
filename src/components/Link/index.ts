import Component from 'src/core/Component'
import LinkTpl from 'src/components/Link/template'

interface IProps {
  id: string
  children: string
}

class Link extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, LinkTpl)
  }

  render() {
    return this.compile(LinkTpl)
  }
}

export default Link
