import * as s from './styles.module.less'

const AuthTpl = `
    <section class="${s.root}">
      <form class="${s.form}">
        <h2 class="${s.title}"> {title} </h2>
        
        <ul class="${s.list}">
            {fields
                <li class="${s.listItem}"> {input} </li>
            %fields}
        </ul>
        
        <div class="${s.controls}">
            {button}
        
            {link}
        </div>
      </form>
    </section>
`

export default AuthTpl
