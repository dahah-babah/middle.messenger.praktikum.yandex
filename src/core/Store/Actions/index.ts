import { userActions } from 'src/core/Store/Actions/UserActions'
import { chatsActions } from 'src/core/Store/Actions/ChatsActions'

export const ACTIONS = {
  ...userActions,
  ...chatsActions,
}
