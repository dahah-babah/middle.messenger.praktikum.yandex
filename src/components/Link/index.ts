import Component from '@/core/Component'
import LinkTpl from '@/components/Link/template'

interface IProps {
  href: string
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
