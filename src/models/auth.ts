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
  nickname(): string {
    return this.get('nickname')
  }
}

export interface ResetPasswordPayload {
  email: string
}
