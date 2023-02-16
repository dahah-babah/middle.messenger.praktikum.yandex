import Store from 'src/core/Store/Store'
import { IUser } from 'src/api/AuthAPI'

const store = new Store()

export const ACTIONS = {
  setUser: (data: IUser) => {
    const state = store.getState()
    const user = state.user ?? {}

    store.set('user', { ...user, ...data })
  },

  setUserId: (id: string) => {
    const state = store.getState()
    const user = state.user ?? {}

    store.set('user', { ...user, id })
  },
}
