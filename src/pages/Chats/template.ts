import caretRight from 'src/assets/icons/caretRight.svg'
import * as s from './styles.module.less'

const ChatsTpl = `
    <section class="${s.root}">
        <aside class="${s.menu}"> 
            <div class="${s.profile}"> 
                <div id="profile" class="${s.link}"> Профиль </div> 
                <img src="${caretRight}" alt="" />
            </div>
            
            <div class="${s.searchWrapper}">
                <input class="${s.search}" type="search" placeholder="Поиск" />
            </div>
            
            <ul class="${s.chats}">
                {loop:chats
                    <li class="${s.chat}"> {chat} </li>
                %loop}
            </ul>
        </aside>
        
        <article class="${s.field}">
            {if:hasNoChats
                <div class="${s.noChats}"> Выберите чат чтобы отправить сообщение </div>
            %if}
            
            {if:activeChat      
                <div class="${s.activeChat}"> {activeChat} </div>
            %if}
        </article>
    </section>
`

export default ChatsTpl
