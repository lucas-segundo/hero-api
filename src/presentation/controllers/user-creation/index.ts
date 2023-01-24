import { UnexpectedError } from 'app/errors/unexpected-error'
import { UserCreater, UserCreaterParams } from 'domain/use-cases/user-creater'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { Controller } from 'presentation/protocols/controller'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class UserCreationController implements Controller {
  constructor(private readonly userCreater: UserCreater) {}

  async handle(
    params: UserCreaterParams
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
      const user = await this.userCreater.create(params)

      return {
        data: user,
        statusCode: HttpStatusCode.CREATED,
      }
    } catch (error) {
      return {
        errors: [new UnexpectedError().message],
        statusCode: HttpStatusCode.SERVER_ERROR,
      }
    }
  }
}
