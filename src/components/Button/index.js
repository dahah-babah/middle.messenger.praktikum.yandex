import * as s from './styles.module.less'

const Button = ({
    type = '{type}',
    children = '{children}',
}) => {
    return `
        <button 
            type="${type}"
            class="${s.button} ${s.primary}"
        >
            ${children}
        </button>
    `
}

export default Button