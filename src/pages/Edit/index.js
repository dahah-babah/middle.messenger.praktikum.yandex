import * as s from './styles.module.less'

import Button from '/src/components/Button'

import avatar from '/src/assets/icons/avatar.svg'
import arrowLeft from '/src/assets/icons/arrowLeft.svg'

const Edit = `
    <article class="${s.root}">
        <aside class="${s.back}">
            <a href="/chats">
                <img src="${arrowLeft}" alt="back" />
            </a>
        </aside>
            
        <section class="${s.profile}">
            <header class="${s.header}">
                <div class="${s.avatar}">
                    <img src="${avatar}" alt="avatar" />
    
                    <div class="${s.overlay}"> Поменять аватар </div>
                </div>
            </header>
            
            <ul class="${s.list}">
                {for field in fields
                    <li class="${s.listItem}">
                        <label for="{name}"> {label} </label>
                        <input id="{name}" type="{type}" name="{name}" class="${s.input}" value="{value}" placeholder="{label}"/>
                    </li>
                %}
            </ul>
    
            <footer class="${s.footer}">
                {set button in ${Button('button')} %}
            </footer>
        </section>
    </article>
`

export default Edit