import {
  LogInPayload,
  ResetPasswordPayload,
  SignUpPayload,
} from '@/models/auth'
import { useAuthStore } from '@/store/auth'
import { isEmptyString } from '@/utils'
import Parse from 'parse'

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
    const user = await Parse.User.logIn(
      logInPayload.username,
      logInPayload.password
    )
    useAuthStore().setUser(user)
  }

  async loadCurrentUser() {
    const user = await Parse.User.current()
    if (user) {
      useAuthStore().setUser(user)
    }
  }

  async logOut() {
    await Parse.User.logOut()
  }

  async resetPassword(resetPasswordPayload: ResetPasswordPayload) {
    await Parse.User.requestPasswordReset(resetPasswordPayload.email)
  }
}

export default new AuthService()
