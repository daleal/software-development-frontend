export interface SignInError {
  username?: Array<string>
  password?: Array<string>
  phoneNumber?: Array<string>
}

export interface LogInError {
  detail?: string
}
