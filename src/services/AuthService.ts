import { LogInPayload, SignUpPayload, User } from '@/models/auth'
import { useAuthStore } from '@/store/auth'
import { isEmptyString } from '@/utils'
import Parse from 'parse'
import ErrorService from './ErrorService'

class AuthService {
  isUsernameValid(username: string) {
    return !isEmptyString(username)
  }

  isPasswordValid(password: string) {
    return !isEmptyString(password)
  }

  async singUp(signUpPayload: SignUpPayload) {
    const user = new Parse.User()
    user.set('username', signUpPayload.email)
    user.set('password', signUpPayload.password)
    user.set('email', signUpPayload.email)

    await user.signUp()
  }

  async logIn(logInPayload: LogInPayload) {
    try {
      const parseUser = await Parse.User.logIn(
        logInPayload.username,
        logInPayload.password
      )
      const user: User = {
        username: parseUser.get('username'),
        email: parseUser.get('email'),
      }
      useAuthStore().setUser(user)
    } catch (e) {
      ErrorService.handleError(e)
    }
  }
}

export default new AuthService()
