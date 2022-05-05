import Parse from 'parse'

export interface CredentialsPayload {
  nickname: string
  username: string
  password: string
  email: string
}

export interface LogInPayload {
  username: string
  password: string
}

export class User extends Parse.User {
  getNickname(): string {
    return this.get('nickname')
  }

  setNickname(nickname: string) {
    this.set('nickname', nickname)
  }
}

export interface ResetPasswordPayload {
  email: string
}
