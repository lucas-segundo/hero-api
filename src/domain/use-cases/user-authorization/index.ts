export type UserAuthorizationParams = {
  token: string
}

export interface UserAuthorization {
  auth(params: UserAuthorizationParams): Promise<boolean>
}
