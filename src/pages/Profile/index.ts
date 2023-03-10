import { TInputType } from 'src/components/Input'
import Link from 'src/components/Link'
import Component, { TEvent } from 'src/core/Component'
import Avatar from 'src/components/Avatar'
import ProfileTpl from 'src/pages/Profile/template'
import AuthController from 'src/controllers/AuthController'
import { connect } from 'src/core/Store/Connect'
import { IUser } from 'src/api/AuthAPI'
import { profileFields } from 'src/data/pages/profile'
import { handleRoute } from 'src/utils/router'
import { getPropsValue } from 'src/utils/helpers'

type TField = {
  name: string
  label: string
  value: string
  type: TInputType
}

interface IProps {
  title: string
  fields: TField[]
  changeDataLink: Link
  changePasswordLink: Link
  exitLink: Link
  avatar: typeof Avatar
  events: TEvent[]
}

class Profile extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, ProfileTpl)
  }

  async init() {
    const changeDataLink = new Link({
      id: 'settings-user',
      children: 'Изменить данные',
      events: [
        {
          tag: 'div',
          name: 'click',
          callback: () => {
            handleRoute('settings-user')
          },
        },
      ],
    })

    const changePasswordLink = new Link({
      id: 'settings-pass',
      children: 'Изменить пароль',
      events: [
        {
          tag: 'div',
          name: 'click',
          callback: () => {
            handleRoute('settings-pass')
          },
        },
      ],
    })

    const exitLink = new Link({
      id: 'sign-in',
      children: 'Выйти',
      events: [
        {
          tag: 'div',
          name: 'click',
          async callback() {
            await AuthController.logout()
          },
        },
      ],
    })

    const events = [
      {
        tag: 'img',
        name: 'click',
        callback: (event: Event) => {
          const target = event.target as HTMLDivElement

          if (!target || target.id !== 'chats') return

          handleRoute('chats')
        },
      },
    ]

    const avatar = new Avatar({})

    this.setProps({ changeDataLink, changePasswordLink, exitLink, avatar, events })
  }

  async logout() {
    await AuthController.logout()
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps) {
    // TODO: при смене аватара не нужно перерисовывать весь компонент
    return super.componentDidUpdate(oldProps, newProps)
  }

  render() {
    return this.compile(ProfileTpl)
  }
}

const mapStateToProps = (state: IUser): IProps => {
  const { first_name: firstName } = state

  const props = {} as IProps

  props.title = firstName

  props.fields = profileFields.map((field: TField) => ({
    ...field,
    value: getPropsValue(state, field.name),
  }))

  return props
}

export default connect(Profile, (state) => mapStateToProps(state.user ?? {}) ?? {})
