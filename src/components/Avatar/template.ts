import * as s from './styles.module.less'

const AvatarTpl = `
    <div class="${s.avatar}">
        <img class="${s.file}" src="{picture}" alt="Avatar" />
        
        <div class="${s.overlay}"> Поменять аватар </div>
        
        <input class="${s.input}" type="file" accept="image/*" name="avatar" alt="avatar" />
    </div>
`

export default AvatarTpl
