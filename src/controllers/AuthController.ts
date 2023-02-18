import API, { AuthAPI, ISignIn, ISignUp } from 'src/api/AuthAPI'
import { ACTIONS } from 'src/core/Store/Actions'
import Router, { ROUTES } from 'src/core/Router/Router'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signIn(data: ISignIn) {
    try {
      await this.api.signIn(data)

      Router.go(ROUTES.PROFILE)
    } catch (error: any) {
      console.error(error)
    }
  }

  async signUp(data: ISignUp) {
    try {
      const userId = await this.api.signUp(data)

      await this.fetchUser()

      ACTIONS.setUserId(userId)

      Router.go(ROUTES.PROFILE)
    } catch (error: any) {
      console.error(error)
    }
  }

  async logout() {
    try {
      await this.api.logout()

      Router.go(ROUTES.SIGN_IN)
    } catch (error: any) {
      console.error(error)
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.fetchUser()

      if (!user) {
        throw new Error(`User is ${user}`)
      }

      const { display_name: displayName, first_name: firstName } = user

      if (!displayName) {
        user.display_name = firstName
      }

      ACTIONS.setUser(user)
    } catch (error: any) {
      throw new Error(`Error: ${error}`)
    }
  }
}

export default new AuthController()
