import BaseAPI from '@/api/BaseAPI'

export interface ISignIn {
  login: string
  password: string
}

export interface ISignUp {
  login: string
  password: string
  email: string
  phone: string
  first_name: string
  second_name: string
}

export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  signIn(data: ISignIn) {
    return this.http.post('/signin', data)
  }

  signUp(data: ISignUp) {
    return this.http.post('/signup', data)
  }

  logout() {
    return this.http.post('/logout')
  }

  fetchUser(): Promise<IUser> {
    return this.http.get('/user')
  }
}

export default new AuthAPI()
