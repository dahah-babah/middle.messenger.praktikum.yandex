import BaseAPI from 'src/api/BaseAPI'
import { IUser } from 'src/api/AuthAPI'

export interface IPassword {
  oldPassword: string
  newPassword: string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  uploadAvatar(data: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', data)
  }

  updateUser(data: IUser): Promise<IUser> {
    return this.http.put('/profile', data)
  }

  updatePassword(data: IPassword) {
    return this.http.put('/password', data)
  }
}

export default new UserAPI()
