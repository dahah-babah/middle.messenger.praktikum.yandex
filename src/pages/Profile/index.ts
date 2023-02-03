import { TInputType } from 'src/components/Input'
import Link from 'src/components/Link'
import Component from 'src/core/Component'
import Avatar from 'src/components/Avatar'
import ProfileTpl from 'src/pages/Profile/template'
import { profilePageData } from 'src/data/pages/profile'

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
  avatar: Avatar
}

class Profile extends Component<IProps> {
  constructor(props: IProps) {
    super('article', props, ProfileTpl)
  }

  render() {
    return this.compile(ProfileTpl)
  }
}

export const ProfilePage = new Profile(profilePageData)
