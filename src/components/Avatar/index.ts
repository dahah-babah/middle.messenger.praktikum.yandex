import Component from 'src/core/Component'
import AvatarTpl from 'src/components/Avatar/template'
import avatar from 'src/assets/icons/avatar.svg'

interface IProps {
  picture: string
}

class Avatar extends Component<IProps> {
  constructor() {
    super('div', { picture: avatar }, AvatarTpl)
  }

  addEvents() {
    super.addEvents()

    const input = this._element.querySelector('input')

    input?.addEventListener('change', (event: Event) => {
      const { target } = event

      if (!target) return

      const { files } = target as HTMLInputElement

      if (!files) return

      const newPicture = URL.createObjectURL(files[0])

      this.setProps({ picture: newPicture })
    })
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    return oldProps.picture !== newProps.picture
  }

  render() {
    return this.compile(AvatarTpl)
  }
}

export default Avatar
