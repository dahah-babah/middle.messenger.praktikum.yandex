import * as s from './styles.module.less'

const ButtonTpl = `
    <button type="{type}" class="${s.button} ${s.primary}" >
        {children}
    </button>
`

export default ButtonTpl
