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

export interface ResetPasswordPayload {
  email: string
}
