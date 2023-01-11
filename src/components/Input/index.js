import * as s from './styles.module.less'

const Input = (props) => {
    const {
        id = '{id}',
        type = '{type}',
        name = '{name}',
        label = '{label}',
        value = '{value}',
        placeholder = '{placeholder}',
    } = props

    return `
        <label for="${id}" class="${s.label}"> ${label} </label>
        <input id="${id}" type="${type}" name="${name}" value="${value}" placeholder="${placeholder}" class="${s.input}" />
    `
}

export default Input