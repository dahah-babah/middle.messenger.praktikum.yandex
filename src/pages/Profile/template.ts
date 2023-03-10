import arrowLeft from 'src/assets/icons/arrowLeft.svg'
import * as s from './styles.module.less'

const ProfileTpl = `
    <article class="${s.root}">
        <aside class="${s.back}">
            <div>
                <img id="chats" src="${arrowLeft}" alt="back" />
            </div>
        </aside>
            
        <form class="${s.profile}">
            <header class="${s.header}">
                {avatar}
    
                <h3 class="${s.title}"> {title} </h3>
            </header>
            
            <ul class="${s.list}">
                {loop:fields
                    <li class="${s.listItem}">
                        <span> {label} </span>
                        <span class="${s.grey}"> {value} </span>
                    </li>
                %loop}
            </ul>
    
            <div class="${s.controls}">
                {changeDataLink}
                
                {changePasswordLink}
                
                {exitLink}
            </div>
        </form>
    </article>
`

export default ProfileTpl
