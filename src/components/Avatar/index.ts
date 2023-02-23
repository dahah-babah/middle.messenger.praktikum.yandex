import Component, { TEvent } from 'src/core/Component'
import AvatarTpl from 'src/components/Avatar/template'
import avatar from 'src/assets/icons/avatar.svg'
import UserController from 'src/controllers/UserController'
import { connect } from 'src/core/Store/Connect'
import { IUser } from 'src/api/AuthAPI'
import { RESOURCES_URL } from 'src/constants/url'
import Store from 'src/core/Store/Store'

interface IProps {
  picture?: string
  events?: TEvent[]
}

class Avatar extends Component<IProps> {
  constructor(props: IProps) {
    super('div', props, AvatarTpl)
  }

  init() {
    const self = this
    const store = new Store()
    const storedAvatar = store.state.user?.avatar
    const picture = storedAvatar ? RESOURCES_URL + storedAvatar : avatar

    const events = [
      {
        tag: 'input',
        name: 'change',
        callback(event: Event) {
          const { target } = event

          if (!target) return

          const { files } = target as HTMLInputElement

          if (!files) return

          self.uploadFile(files[0])
        },
      },
    ]

    this.setProps({ picture, events })
  }

  async uploadFile(file: File) {
    const formData = new FormData()
    const newFile = new File([file], file.name.replace(/\s/g, '_'))

    formData.append('avatar', newFile)

    await UserController.uploadAvatar(formData)
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    return oldProps.picture !== newProps.picture
  }

  render() {
    return this.compile(AvatarTpl)
  }
}

const mapStateToProps = (user: IUser) => {
  const { avatar: picture } = user

  const props: IProps = {}

  props.picture = picture ? RESOURCES_URL + picture : avatar

  return props
}

export default connect(Avatar, (state) => mapStateToProps(state.user ?? {}) ?? {})
