export type UserFinderRepositoryModel = {
  id: string
  name: string
  email: string
  passwordHashed: string
}

export type UserFinderRepositoryParams = {
  by: keyof Pick<UserFinderRepositoryModel, 'id' | 'email'>
  value: string
}

export interface UserFinderRepository {
  find(
    params: UserFinderRepositoryParams
  ): Promise<UserFinderRepositoryModel | undefined>
}
