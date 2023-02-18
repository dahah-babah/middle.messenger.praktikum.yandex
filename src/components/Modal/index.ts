import Component, { TEvent } from 'src/core/Component'
import ModalTpl from 'src/components/Modal/template'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

interface IProps {
  id: string
  title: string
  input?: Input
  button?: Button
  events?: TEvent[]
}

class Modal extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, ModalTpl)
  }

  init() {
    const events = [
      {
        tag: 'div',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLDivElement

          if (target.id === 'overlay') {
            this.closeModal()
          }
        },
      },
    ]

    const comingEvents = this._props.events ?? []

    this.setProps({ events: [...comingEvents, ...events] })
  }

  closeModal() {
    this.clear()
  }

  render() {
    return this.compile(ModalTpl)
  }
}

export default Modal
