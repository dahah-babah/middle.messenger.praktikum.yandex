import API, { IPassword, UserAPI } from 'src/api/UserAPI'
import { IUser } from 'src/api/AuthAPI'
import { ACTIONS } from 'src/core/Store/Actions'

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
}

export default new UserController()
