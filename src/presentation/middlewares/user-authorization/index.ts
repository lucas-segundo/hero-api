import {
  UserAuthorization,
  UserAuthorizationParams,
} from 'domain/use-cases/user-authorization'
import { HttpErrorResponse } from 'presentation/protocols/http'
import { Middleware } from 'presentation/protocols/middleware'

export class UserAuthorizationMiddleware implements Middleware {
  constructor(private userAuthorization: UserAuthorization) {}

  async handle(
    params: UserAuthorizationParams
  ): Promise<void | HttpErrorResponse> {
    await this.userAuthorization.auth(params)

    return
  }
}
