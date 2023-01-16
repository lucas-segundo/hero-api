import { User } from 'core/domain/models/user'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'

export interface UserCreaterRepository {
  create(params: UserCreaterParams): Promise<User>
}
