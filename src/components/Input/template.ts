import * as s from './styles.module.less'

const InputTpl = `
    <div class="${s.root}">
        {if:label
            <label for="{id}" class="${s.label}"> {label} </label>
        %if}
        
        <input 
          id="{id}" 
          type="{type}" 
          name="{name}" 
          value="{value}" 
          placeholder="{placeholder}" 
          class="${s.input}" 
        />
        
        {if:error
            <div class="${s.error}"> {error} </div>
        %if}
    </div>
`

export default InputTpl
