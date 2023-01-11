import * as s from './styles.module.less'

import caretRight from '/src/assets/icons/caretRight.svg'

const Chats = `
    <section class="${s.root}">
        <aside class="${s.chats}"> 
            <div class="${s.profile}"> 
                <a href="/profile" class="${s.link}"> Профиль </a> 
                <img src="${caretRight}" />
            </div>
            
            <input class="${s.search}" type="search" placeholder="Поиск" />
        </aside>
        
        <article class="${s.chat}">             
            <footer class="${s.footer}">
                <input class="${s.input}" name="message" placeholder="Сообщение" />
            </footer>
        </article>
    </section>
`

export default Chats