import Link from 'src/components/Link'
import { routerEvents } from '/data/events'

export const errorPageData404 = {
  code: '404',
  caption: 'Не туда попали',
  link: new Link({ id: 'chats', children: 'Назад к чатам' }),
  events: routerEvents,
}

export const errorPageData500 = {
  code: '500',
  caption: 'Мы уже фиксим',
  link: new Link({ id: 'chats', children: 'Назад к чатам' }),
  events: routerEvents,
}
