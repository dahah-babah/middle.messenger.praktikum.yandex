import avatar from '@/assets/icons/avatar.svg'

import * as s from './styles.module.less'

const AvatarTpl = `
    <div class="${s.avatar}">
        <input src="${avatar}" type="image" name="avatar" alt="avatar"  />

        <div class="${s.overlay}"> Поменять аватар </div>
    </div>
`

export default AvatarTpl
