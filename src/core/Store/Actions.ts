import Store from 'src/core/Store/Store'
import { IUser } from 'src/api/AuthAPI'

export const ACTIONS = {
  setUser: (data: IUser) => {
    const state = Store.getState()
    const user = state.user ?? {}

    Store.set('user', { ...user, ...data })
  },

  setUserId: (id: string) => {
    const state = Store.getState()
    const user = state.user ?? {}

    Store.set('user', { ...user, id })
  },
}
