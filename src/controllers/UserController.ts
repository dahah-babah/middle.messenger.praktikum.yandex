import API, { UserAPI } from 'src/api/UserAPI'
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
}

export default new UserController()
