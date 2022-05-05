import { CredentialsPayload, LogInPayload, ResetPasswordPayload } from '@/models/auth'
import { useAuthStore } from '@/store/auth'
import Parse from 'parse'

class AuthService {
  async singUp(credentialsPayload: CredentialsPayload) {
    const user = new Parse.User()
    user.set('nickname', credentialsPayload.nickname)
    user.set('username', credentialsPayload.email)
    user.set('password', credentialsPayload.password)
    user.set('email', credentialsPayload.email)
    await user.signUp()
  }

  async logIn(logInPayload: LogInPayload) {
    const user = await Parse.User.logIn(logInPayload.username, logInPayload.password)
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
    useAuthStore().setUser(null)
  }

  async resetPassword(resetPasswordPayload: ResetPasswordPayload) {
    await Parse.User.requestPasswordReset(resetPasswordPayload.email)
  }

  async updateEmail(credentialsPayload: CredentialsPayload) {
    const user = useAuthStore().user
    user?.setEmail(credentialsPayload.email)
    user?.save()
  }

  async updatePassword(credentialsPayload: CredentialsPayload) {
    const user = useAuthStore().user
    user?.setUsername(credentialsPayload.username)
    user?.setPassword(credentialsPayload.password)
    user?.save()
  }
}

export default new AuthService()
