import { userActions } from '@/core/Store/Actions/UserActions'
import { chatsActions } from '@/core/Store/Actions/ChatsActions'
import { messagesActions } from '@/core/Store/Actions/MessagesActions'

export const ACTIONS = {
  ...userActions,
  ...chatsActions,
  ...messagesActions,
}
