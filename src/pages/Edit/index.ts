import Button from '@/components/Button'
import Component from '@/core/Component'
import EditTpl from '@/pages/Edit/template'
import { TInputType } from '@/components/Input'
import Avatar from '@/components/Avatar'

type TField = {
    name: string
    label: string
    value: string
    type: TInputType
}

interface IProps {
    avatar: Avatar
    button: Button
    fields: TField[]
}

class Edit extends Component<IProps> {
    constructor(props: IProps) {
        super('article', props, EditTpl)
    }

    render() {
        return this.compile(EditTpl)
    }
}

const editUserData = {
    avatar: new Avatar(),
    button: new Button({
        type: 'submit',
        children: 'Сохранить',
    }),
    fields: [
        {
            name: 'email',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            type: 'email' as TInputType,
        },
        {
            name: 'login',
            label: 'Логин',
            value: 'ivanivanov',
            type: 'text' as TInputType,
        },
        {
            name: 'first_name',
            label: 'Имя',
            value: 'Иван',
            type: 'text' as TInputType,
        },
        {
            name: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            type: 'text' as TInputType,
        },
        {
            name: 'display_name',
            label: 'Имя в чате',
            value: 'Иванushka',
            type: 'text' as TInputType,
        },
        {
            name: 'phone',
            label: 'Телефон',
            value: '+7 (909) 967 30 30',
            type: 'phone' as TInputType,
        },
    ],
}

const ditPasswordData = {
    avatar: new Avatar(),
    button: new Button({
        type: 'submit',
        children: 'Сохранить',
    }),
    fields: [
        {
            name: 'oldPassword',
            label: 'Старый пароль',
            value: 'ivanivanov',
            type: 'password' as TInputType,
        },
        {
            name: 'newPassword',
            label: 'Новый пароль',
            value: 'ivanivanov123',
            type: 'password' as TInputType,
        },
        {
            name: 'repeatPassword',
            label: 'Повторите новый пароль',
            value: 'ivanivanov123',
            type: 'password' as TInputType,
        },
    ],
}

const EditUserPage = new Edit(editUserData)
const EditPasswordPage = new Edit(ditPasswordData)

export { EditUserPage, EditPasswordPage }
