import {
  UserAuthorization,
  UserAuthorizationParams,
} from 'domain/use-cases/user-authorization'
import { UnauthorizedError } from 'presentation/errors/unauthorized-error'
import { HttpErrorResponse } from 'presentation/protocols/http'
import { Middleware } from 'presentation/protocols/middleware'

export class UserAuthorizationMiddleware implements Middleware {
  constructor(private userAuthorization: UserAuthorization) {}

  async handle(
    params: UserAuthorizationParams
  ): Promise<void | HttpErrorResponse> {
    const isAuthorized = await this.userAuthorization.auth(params)

    if (!isAuthorized) {
      const error = new UnauthorizedError()
      return {
        errors: [error.message],
        statusCode: error.statusCode,
      }
    }
  }
}
