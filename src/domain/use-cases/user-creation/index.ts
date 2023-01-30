import { User } from 'domain/models/user'

export type UserCreationParams = {
  name: string
  email: string
  password: string
}

export interface UserCreation {
  create(params: UserCreationParams): Promise<User>
}
