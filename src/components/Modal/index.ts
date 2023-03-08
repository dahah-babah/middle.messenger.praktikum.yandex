import { Component, TEvent } from '@/core/Component'
import ModalTpl from '@/components/Modal/template'
import Input from '@/components/Input'
import Button from '@/components/Button'

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
    const self = this

    const events = [
      {
        tag: 'div',
        name: 'click',
        callback(event: Event) {
          const target = event.target as HTMLDivElement

          if (target.id === 'overlay') {
            self.closeModal()
          }
        },
      },
    ]

    const comingEvents = this.props.events ?? []

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
