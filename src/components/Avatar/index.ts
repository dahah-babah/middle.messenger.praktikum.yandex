import Component from '@/core/Component'
import AvatarTpl from '@/components/Avatar/template'

class Avatar extends Component<{}> {
    constructor() {
        super('div', {}, AvatarTpl)
    }

    render() {
        return this.compile(AvatarTpl)
    }
}

export default Avatar
