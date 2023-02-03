import * as s from './styles.module.less'

const InputTpl = `
    <div>
        <label for="{id}" class="${s.label}"> {label} </label>
        <input 
          id="{id}" 
          type="{type}" 
          name="{name}" 
          value="{value}" 
          placeholder="{placeholder}" 
          class="${s.input}" 
        />
    </div>
`

export default InputTpl
