import * as s from './styles.module.less'

export const MessageTpl = `
    <div class="${s.root}">
        {if:fromUser
            <div class="${s.message} ${s.fromUser}" > 
                <p class="${s.text}"> {text} </p> 
                <span class="${s.date}"> {date} </span> 
            </div>
        %if}
    
       {if:fromMe
          <div class="${s.message} ${s.fromMe}" >
              <p class="${s.text}"> {text} </p> 
              <span class="${s.date}"> {date} </span> 
          </div>
        %if}
    </div>
`

export default MessageTpl
