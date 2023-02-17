import BaseAPI from 'src/api/BaseAPI'
import { IUser } from 'src/api/AuthAPI'

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  uploadAvatar(data: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', data)
  }
}

export default new UserAPI()
