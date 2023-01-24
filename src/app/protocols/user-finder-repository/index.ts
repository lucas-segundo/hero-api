import { DbUser } from 'app/models/db-user'

export type UserFinderRepositoryParams = {
  by: keyof Pick<DbUser, 'id' | 'email'>
  value: string
}

export interface UserFinderRepository {
  find(params: UserFinderRepositoryParams): Promise<DbUser | undefined>
}
