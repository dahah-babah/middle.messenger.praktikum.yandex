import arrowLeft from 'src/assets/icons/arrowLeft.svg'
import options from 'src/assets/icons/options.svg'

import * as s from './styles.module.less'

const ChatTpl = `
    <div class="${s.root}">
        <div class="${s.header}">
            <img src="{avatar}" alt="user avatar" class="${s.avatar}" />
            <div class="${s.user}"> {user} </div>
            <img id="chat-options" src="${options}" class="${s.options}" alt="options" />
            
            {tooltip}
        </div>
        
        <ul id="messages" class="${s.messages}">
            {loop:messages
                <li class="${s.message}">
                  {message}
                </li>
            %loop}
        </ul>
        
        <form id="message" class="${s.footer}">
            <input id="message-input" class="${s.input}" name="message" placeholder="Сообщение" />
            
            <button id="message-button" class="${s.sendButton}">
                <img class="${s.arrow}" src="${arrowLeft}" alt="Отправить" />
            </button>
        </form>
        
        {if:modal
            <div class="${s.modal}"> {modal} </div>
        %if}
    </div>   
`

export default ChatTpl
