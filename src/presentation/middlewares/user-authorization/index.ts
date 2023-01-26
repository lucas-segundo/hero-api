import {
  UserAuthorization,
  UserAuthorizationParams,
} from 'domain/use-cases/user-authorization'
import { Controller } from 'presentation/protocols/controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/protocols/http'

export class UserAuthorizationMiddleware implements Controller {
  constructor(private userAuthorization: UserAuthorization) {}

  async handle(
    params: UserAuthorizationParams
  ): Promise<HttpResponse<any> | HttpErrorResponse> {
    await this.userAuthorization.auth(params)

    return
  }
}
