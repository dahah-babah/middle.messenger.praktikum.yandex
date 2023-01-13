import * as s from './styles.module.less'

import Button from '/src/components/Button'
import Input from '/src/components/Input'
import Link from '/src/components/Link'

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
