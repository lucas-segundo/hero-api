export type UserCreaterRepositoryParams = {
  name: string
  email: string
  passwordHashed: string
}

export type UserCreaterRepositoryModel = {
  id: string
}
export interface UserCreaterRepository {
  create(
    params: UserCreaterRepositoryParams
  ): Promise<UserCreaterRepositoryModel>
}
