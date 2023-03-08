import BaseAPI from '@/api/BaseAPI'
import { IUser } from '@/api/AuthAPI'

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

  fetchUsersByLogin(data: { login: string }): Promise<IUser[]> {
    return this.http.post('/search', data)
  }

  fetchUserById(data: number): Promise<IUser> {
    return this.http.get(`/${data}`)
  }
}

export default new UserAPI()
