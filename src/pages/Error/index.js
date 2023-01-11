import * as s from './styles.module.less'

import Link from '../../components/Link'

const Error = `
    <section class="${s.root}">
        <h1 class="${s.title}"> {code} </h1>
        
        <span class="${s.caption}"> {caption} </span>
        
        <div> {set link in ${Link('link')} %} </div>
    </section>
`

export default Error