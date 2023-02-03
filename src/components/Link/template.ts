import * as s from './styles.module.less'

const LinkTpl = `
   <div class="${s.root}">
       <a href="{href}" class="${s.link}"> {children} </a>
   </div>
`

export default LinkTpl
