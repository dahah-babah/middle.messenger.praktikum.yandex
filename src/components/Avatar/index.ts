import Component, { TEvent } from 'src/core/Component'
import AvatarTpl from 'src/components/Avatar/template'
import avatar from 'src/assets/icons/avatar.svg'

interface IProps {
  picture?: string
  events?: TEvent[]
}

class Avatar extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, AvatarTpl)
  }

  init() {
    const picture = avatar

    const events = [
      {
        tag: 'input',
        name: 'change',
        callback(event: Event) {
          const { target } = event

          if (!target) return

          const { files } = target as HTMLInputElement

          if (!files) return

          const newPicture = URL.createObjectURL(files[0])

          this.setProps({ picture: newPicture })
        },
      },
    ]

    this.setProps({ picture, events })
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    return oldProps.picture !== newProps.picture
  }

  render() {
    return this.compile(AvatarTpl)
  }
}

export default Avatar
