import * as s from './styles.module.less'

export const ChatTpl = `
    <div class="${s.chat}">
        <div class="${s.avatar}"> {avatar} </div>
        
        <span class="${s.name}"> {name} </span>
        
        <p class="${s.preview}"> {preview} </p>
        
        <span class="${s.time}"> {time} </span>
        
        <div class="${s.counter}"> {unreadCount} </div>
    </div>
`

export default ChatTpl
