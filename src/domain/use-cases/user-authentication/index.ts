import { User } from 'domain/models/user'

export type UserAuthenticationParams = {
  email: string
  password: string
}

export type AuthenticatedUser = {
  token: string
  user: User
}

export interface UserAuthentication {
  auth(params: UserAuthenticationParams): Promise<AuthenticatedUser>
}
