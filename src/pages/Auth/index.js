import * as s from './styles.module.less'

import Button from '/src/components/Button'
import Input from '/src/components/Input'
import Link from '/src/components/Link'

const Auth = `
    <section class="${s.root}">
      <div class="${s.form}">
        <h2 class="${s.title}"> {title} </h2>

        <ul class="${s.list}">
            {for field in fields
                <li class="${s.listItem}">
                    ${Input('field')}
                </li>
            %}
        </ul>

        <footer class="${s.footer}">
            {set button in ${Button('button')} %}
            {set link in ${Link('link')} %}
        </footer>
      </div>
    </section>
`

export default Auth
