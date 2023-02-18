import * as s from './styles.module.less'

const ModalTpl = `
    <div id="overlay" class="${s.root}" >
        <form id="{id}" class="${s.modal}">
            <h3 class="${s.title}"> {title} </h3>
            
            <div class="${s.content}"> {input} </div>
            
            <div class="${s.footer}"> {button} </div>
        </form>
    </div>
`

export default ModalTpl
