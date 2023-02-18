import Component, { TEvent } from 'src/core/Component'
import TooltipTpl from 'src/components/Tooltip/template'

interface IOption {
  id: string
  title: string
  icon?: string
}

interface IProps {
  nodeId: string
  options: IOption[]
  events?: TEvent[]
}

class Tooltip extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, TooltipTpl)
  }

  init() {
    const comingEvents = this._props.events ?? []

    this.setProps({ events: [...comingEvents] })
  }

  render() {
    return this.compile(TooltipTpl)
  }
}

export default Tooltip
