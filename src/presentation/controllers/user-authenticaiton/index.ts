import {
  UserAuthentication,
  UserAuthenticationParams,
} from 'domain/use-cases/user-authentication'
import { Controller } from 'presentation/protocols/controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/protocols/http'

export class UserAuthenticationController implements Controller {
  constructor(private userAuthentication: UserAuthentication) {}

  async handle(
    params: UserAuthenticationParams
  ): Promise<HttpResponse | HttpErrorResponse> {
    await this.userAuthentication.auth(params)
    return null
  }
}
