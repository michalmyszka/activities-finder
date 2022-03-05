import { LogInPayload, SignUpPayload, User } from '@/models/auth'
import { useAuthStore } from '@/store/auth'

class AuthService {
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
}

export default new AuthService()
