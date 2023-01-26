import caretRight from '@/assets/icons/caretRight.svg'
import * as s from './styles.module.less'

const ChatsTpl = `
    <section class="${s.root}">
        <aside class="${s.menu}"> 
            <div class="${s.profile}"> 
                <a href="/profile" class="${s.link}"> Профиль </a> 
                <img src="${caretRight}" alt="" />
            </div>
            
            <input class="${s.search}" type="search" placeholder="Поиск" />
            
            <ul class="${s.chats}">
                {loop:chats
                    <li class="${s.chat}"> {chat} </li>
                %loop}
            </ul>
        </aside>
        
        <article class="${s.field}">             
            <div class="${s.footer}">
                <input class="${s.input}" name="message" placeholder="Сообщение" />
            </div>
        </article>
    </section>
`

export default ChatsTpl
