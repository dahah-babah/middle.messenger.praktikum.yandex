import * as s from './styles.module.less'

const TooltipTpl = `
    <div class="${s.root}">
        <ul class="${s.list}">
            {loop:options
                <li id="{id}" class="${s.item}">
                    {title}
                </li>
            %loop}
        </ul>
    </div>   
`

export default TooltipTpl
