import Store from '@/core/Store/Store'
import { IUser } from '@/api/AuthAPI'

const store = new Store()

export const userActions = {
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
