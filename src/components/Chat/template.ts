import arrowLeft from 'src/assets/icons/arrowLeft.svg'
import options from 'src/assets/icons/options.svg'

import * as s from './styles.module.less'

const ChatTpl = `
    <div class="${s.root}">
        <div class="${s.header}">
            <div class="${s.avatar}"> {avatar} </div>
            <div class="${s.user}"> {user} </div>
            <img id="chat-options" src="${options}" class="${s.options}" alt="options" />
            
            {tooltip}
        </div>
        
        <ul class="${s.messages}">
            {loop:messages
                <li class="${s.message}">
                  {message}
                </li>
            %loop}
        </ul>
        
        <div class="${s.footer}">
            <input id="message" class="${s.input}" name="message" placeholder="Сообщение" />
            
            <button id="send-message" class="${s.sendButton}">
                <img class="${s.arrow}" src="${arrowLeft}" alt="Отправить" />
            </button>
        </div>
        
        {if:modal
            <div class="${s.modal}"> {modal} </div>
        %if}
    </div>   
`

export default ChatTpl
