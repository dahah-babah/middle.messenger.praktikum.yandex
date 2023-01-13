import * as s from './styles.module.less'

import Link from '/src/components/Link'

import avatar from '/src/assets/icons/avatar.svg'
import arrowLeft from '/src/assets/icons/arrowLeft.svg'

const Profile = `
    <article class="${s.root}">
        <aside class="${s.back}">
            <a href="/chats">
                <img src="${arrowLeft}" alt="back" />
            </a>
        </aside>
            
        <form class="${s.profile}">
            <header class="${s.header}">
                <div class="${s.avatar}">
                    <input src="${avatar}" type="image" name="avatar" alt="avatar"  />
    
                    <div class="${s.overlay}"> Поменять аватар </div>
                </div>
    
                <h3 class="${s.title}"> {title} </h3>
            </header>
            
            <ul class="${s.list}">
                {for field in fields
                    <li class="${s.listItem}">
                        <span> {label} </span>
                        <span class="${s.grey}"> {value} </span>
                    </li>
                %}
            </ul>
    
            <div class="${s.controls}">
                {set changeDataLink in ${Link('link')} %}
                {set changePasswordLink in ${Link('link')} %}
                {set exitLink in ${Link('link')} %}
            </div>
        </form>
    </article>
`

export default Profile
