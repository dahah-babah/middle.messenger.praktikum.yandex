import cross from 'src/assets/icons/cross.svg'

import * as s from './styles.module.less'

const ChatPreviewTpl = `
    <div id="{id}" class="${s.chat}">
        <div class="${s.avatar}"> {avatar} </div>
        
        <span class="${s.name}"> {title} </span>
        
        <p class="${s.preview}"> {preview} </p>
        
        <span class="${s.time}"> {time} </span>
        
        {if:unreadCount
            <div class="${s.counter}"> {unreadCount} </div>
        %if}
        
        <img id="cross" src="${cross}" alt="delete chat" class="${s.cross}" />
    </div>
`

export default ChatPreviewTpl
