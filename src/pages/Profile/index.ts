import { TInputType } from '@/components/Input'
import Link from '@/components/Link'
import Component from '@/core/Component'
import ProfileTpl from '@/pages/Profile/template'
import Avatar from '@/components/Avatar'
import { profilePageData } from '@/data/pages/profile'

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
