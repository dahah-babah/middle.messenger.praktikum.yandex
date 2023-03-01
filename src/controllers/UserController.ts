import API, { IPassword, UserAPI } from '@/api/UserAPI'
import { IUser } from '@/api/AuthAPI'
import { ACTIONS } from '@/core/Store/Actions'

class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = API
  }

  async uploadAvatar(data: FormData) {
    try {
      const user = await this.api.uploadAvatar(data)

      ACTIONS.setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  async updateUser(data: IUser) {
    try {
      const user = await this.api.updateUser(data)

      ACTIONS.setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  async updatePassword(data: IPassword) {
    try {
      await this.api.updatePassword(data)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUsersByLogin(data: { login: string }): Promise<IUser[]> {
    try {
      return await this.api.fetchUsersByLogin(data)
    } catch (error) {
      throw new Error('Users not found')
    }
  }

  async fetchUserById(data: number): Promise<IUser> {
    try {
      return await this.api.fetchUserById(data)
    } catch (error) {
      throw new Error('User not found')
    }
  }
}

export default new UserController()
