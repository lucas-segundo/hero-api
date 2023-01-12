export type UserCreaterParams = {
  name: string
  email: string
  password: string
}

export interface UserCreater {
  create(params: UserCreaterParams)
}
