import * as s from './styles.module.less'

const ChatTpl = `
    <div class="${s.root}">
        <div class="${s.header}">
            <div class="${s.avatar}"> {avatar} </div>
            <div class="${s.user}"> {user} </div>
        </div>
        
        <ul class="${s.messages}">
            {loop:messages
                <li class="${s.message}">
                  <p> {text} </p>
                  <span> {date} </span>
                </li>
            %loop}
        </ul>
        
        <div class="${s.footer}">
            <input class="${s.input}" name="message" placeholder="Сообщение" />
        </div>
    </div>   
`

export default ChatTpl
