import {
  UserAuthentication,
  UserAuthenticationParams,
} from 'domain/use-cases/user-authentication'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { Controller } from 'presentation/protocols/controller'
import {
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class UserAuthenticationController implements Controller {
  constructor(private userAuthentication: UserAuthentication) {}

  async handle(
    params: UserAuthenticationParams
  ): Promise<HttpResponse | HttpErrorResponse> {
    const errors = []

    const { email, password } = params
    !email && errors.push(new MissingParamError('email').message)
    !password && errors.push(new MissingParamError('password').message)

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    await this.userAuthentication.auth(params)
    return null
  }
}
