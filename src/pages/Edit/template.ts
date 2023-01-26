import arrowLeft from '@/assets/icons/arrowLeft.svg'

import * as s from './styles.module.less'

const EditTpl = `
    <article class="${s.root}">
        <aside class="${s.back}">
            <a href="/chats">
                <img src="${arrowLeft}" alt="back" />
            </a>
        </aside>
            
        <section class="${s.profile}">
            <header class="${s.header}">
                {avatar}
            </header>
            
            <form class="${s.form}">
                <ul class="${s.list}">
                    {loop:fields
                        <li class="${s.listItem}">
                            <label for="{name}"> {label} </label>
                            <input id="{name}" type="{type}" name="{name}" class="${s.input}" value="{value}" placeholder="{label}" />
                        </li>
                    %loop}
                </ul>
                
                <div class="${s.button}">
                    {button}
                </div>
            </form>
        </section>
    </article>
`
export default EditTpl
