import { User } from 'domain/models/user'

export type UserCreaterParams = {
  name: string
  email: string
  password: string
}

export interface UserCreater {
  create(params: UserCreaterParams): Promise<User>
}
