import { User } from 'domain/models/user'

export type UserCreaterRepositoryParams = {
  name: string
  email: string
  passwordHashed: string
}
export interface UserCreaterRepository {
  create(params: UserCreaterRepositoryParams): Promise<User>
}
