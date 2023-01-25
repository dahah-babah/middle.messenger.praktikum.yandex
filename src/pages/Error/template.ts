import * as s from './styles.module.less'

const ErrorTpl = `
    <section class="${s.root}">
        <h1 class="${s.title}"> {code} </h1>
        
        <span class="${s.caption}"> {caption} </span>
        
        {link}
    </section>
`

export default ErrorTpl
