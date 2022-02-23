import { SignUpPayload } from '@/models/auth'
import ErrorService from './ErrorService'

class AuthService {
  async singUp(signUpPayload: SignUpPayload) {
    try {
      const user = new Parse.User()
      user.set('username', signUpPayload.email)
      user.set('password', signUpPayload.password)
      user.set('email', signUpPayload.email)

      const newUser = await user.signUp()
    } catch (e) {
      ErrorService.handleError(e)
    }
  }
}

export default new AuthService()
