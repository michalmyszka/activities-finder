import { CredentialsPayload, LogInPayload, ResetPasswordPayload, User } from '@/models/auth'
import { useAuthStore } from '@/store/auth'

class AuthService {
  async singUp(credentialsPayload: CredentialsPayload) {
    const user = new User()
    user.set('nickname', credentialsPayload.nickname)
    user.set('username', credentialsPayload.email)
    user.set('password', credentialsPayload.password)
    user.set('email', credentialsPayload.email)
    await user.signUp()
  }

  async logIn(logInPayload: LogInPayload) {
    const user = (await User.logIn(logInPayload.username, logInPayload.password)) as User
    useAuthStore().setUser(user)
  }

  async loadCurrentUser() {
    const user = User.current() as User
    if (user) {
      useAuthStore().setUser(user)
    }
  }

  async logOut() {
    await User.logOut()
    useAuthStore().setUser(null)
  }

  async resetPassword(resetPasswordPayload: ResetPasswordPayload) {
    await User.requestPasswordReset(resetPasswordPayload.email)
  }

  async updateEmail(credentialsPayload: CredentialsPayload) {
    const user = useAuthStore().user
    user?.setEmail(credentialsPayload.email)
    user?.setUsername(credentialsPayload.username)
    user?.save()
  }

  async updatePassword(credentialsPayload: CredentialsPayload) {
    const user = useAuthStore().user
    user?.setPassword(credentialsPayload.password)
    user?.save()
  }
}

export default new AuthService()
