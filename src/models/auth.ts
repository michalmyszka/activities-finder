export interface SignUpPayload {
  username: string
  password: string
  email: string
}

export interface LogInPayload {
  username: string
  password: string
}

export interface User {
  username: string
  email: string
}

export interface ResetPasswordPayload {
  email: string
}
