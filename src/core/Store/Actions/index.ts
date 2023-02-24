import { userActions } from 'src/core/Store/Actions/UserActions'
import { chatsActions } from 'src/core/Store/Actions/ChatsActions'
import { messagesActions } from 'src/core/Store/Actions/MessagesActions'

export const ACTIONS = {
  ...userActions,
  ...chatsActions,
  ...messagesActions,
}
