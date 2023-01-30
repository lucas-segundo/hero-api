export type UserCreationRepositoryParams = {
  name: string
  email: string
  passwordHashed: string
}

export type UserCreationRepositoryModel = {
  id: string
}
export interface UserCreationRepository {
  create(
    params: UserCreationRepositoryParams
  ): Promise<UserCreationRepositoryModel>
}
