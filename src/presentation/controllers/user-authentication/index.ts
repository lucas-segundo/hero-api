import { KnownError } from 'domain/errors/known-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import {
  AuthenticatedUser,
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
  ): Promise<HttpResponse<AuthenticatedUser> | HttpErrorResponse> {
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

    try {
      const authenticatedUser = await this.userAuthentication.auth(params)
      return {
        data: authenticatedUser,
        statusCode: HttpStatusCode.OK,
      }
    } catch (error) {
      if (error instanceof KnownError) {
        errors.push(error.message)
      } else {
        errors.push(new UnexpectedError().message)
      }

      return {
        errors,
        statusCode: HttpStatusCode.SERVER_ERROR,
      }
    }
  }
}
