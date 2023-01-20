import * as s from './styles.module.less'

const Link = ({
  href = '{href}',
  children = '{children}',
}) => `
        <a href="${href}" class="${s.link}"> ${children} </a>
    `

export default Link
