import { User } from 'domain/models/user'

export type UserFinderRepositoryParams = {
  by: keyof Pick<User, 'id' | 'email'>
  value: string
}

export interface UserFinderRepository {
  find(params: UserFinderRepositoryParams): Promise<User>
}
