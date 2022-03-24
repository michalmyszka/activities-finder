import {
  LogInPayload,
  ResetPasswordPayload,
  SignUpPayload,
  User,
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
    const parseUser = await Parse.User.logIn(
      logInPayload.username,
      logInPayload.password
    )
    const user: User = {
      username: parseUser.get('username'),
      email: parseUser.get('email'),
    }
    useAuthStore().setUser(user)
  }

  async loadCurrentUser() {
    const parseUser = await Parse.User.current()
    if (parseUser) {
      const user: User = {
        username: parseUser.get('username'),
        email: parseUser.get('email'),
      }
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
