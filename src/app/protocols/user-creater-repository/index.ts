import { User } from 'domain/models/user'
import { UserCreaterParams } from 'domain/use-cases/user-creater'

export type UserCreaterRepositoryParams = {
  name: string
  email: string
  passwordHashed: string
}
export interface UserCreaterRepository {
  create(params: UserCreaterRepositoryParams): Promise<User>
}
