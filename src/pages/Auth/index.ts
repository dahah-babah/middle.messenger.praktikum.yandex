import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from '@/components/Link'
import * as s from './styles.module.less'

const Auth = `
    <section class="${s.root}">
      <form class="${s.form}">
        <h2 class="${s.title}"> {title} </h2>

        <ul class="${s.list}">
            {for field in fields
                <li class="${s.listItem}">
                    ${Input('field')}
                </li>
            %}
        </ul>

        <div class="${s.controls}">
            {set button in ${Button('button')} %}
            {set link in ${Link('link')} %}
        </div>
      </form>
    </section>
`

export default Auth
