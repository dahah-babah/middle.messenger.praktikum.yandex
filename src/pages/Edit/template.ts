import arrowLeft from 'src/assets/icons/arrowLeft.svg'

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
            
            <form id="{formId}" class="${s.form}">
                <ul class="${s.list}">
                    {loop:fields
                        <li class="${s.listItem}">
                            {input}
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

/*
<label for="{name}"> {label} </label>
<input id="{name}" type="{type}" name="{name}" required="" class="${s.input}" value="{value}" placeholder="{label}" />
 */