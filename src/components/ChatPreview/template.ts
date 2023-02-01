import * as s from './styles.module.less'

export const ChatPreviewTpl = `
    <div id="{id}" class="${s.chat}">
        <div class="${s.avatar}"> {avatar} </div>
        
        <span class="${s.name}"> {name} </span>
        
        <p class="${s.preview}"> {preview} </p>
        
        <span class="${s.time}"> {time} </span>
        
        {if:unreadCount
            <div class="${s.counter}"> {unreadCount} </div>
        %if}
    </div>
`

export default ChatPreviewTpl
