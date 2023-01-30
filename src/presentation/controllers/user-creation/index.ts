import { KnownError } from 'domain/errors/known-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import {
  UserCreation,
  UserCreationParams,
} from 'domain/use-cases/user-creation'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { Controller } from 'presentation/protocols/controller'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class UserCreationController implements Controller {
  constructor(private readonly UserCreation: UserCreation) {}

  async handle(
    params: UserCreationParams
  ): Promise<HttpResponse | HttpErrorResponse> {
    const errors = []

    const { name, email, password } = params
    !name && errors.push(new MissingParamError('name').message)
    !email && errors.push(new MissingParamError('email').message)
    !password && errors.push(new MissingParamError('password').message)

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    try {
      const user = await this.UserCreation.create(params)

      return {
        data: user,
        statusCode: HttpStatusCode.CREATED,
      }
    } catch (error) {
      const statusCode = HttpStatusCode.SERVER_ERROR
      if (error instanceof KnownError) {
        return {
          errors: [error.message],
          statusCode,
        }
      }

      return {
        errors: [new UnexpectedError().message],
        statusCode,
      }
    }
  }
}
