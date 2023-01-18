import { UserCreater, UserCreaterParams } from 'domain/use-cases/user-creater'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class UserCreationController {
  constructor(private readonly userCreater: UserCreater) {}

  async handle(
    params: UserCreaterParams
  ): Promise<HttpResponse | HttpErrorResponse> {
    const errors = []

    const { name, email, password } = params
    !name && errors.push(new MissingParamError('name'))
    !email && errors.push(new MissingParamError('email'))
    !password && errors.push(new MissingParamError('password'))

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    const user = await this.userCreater.create(params)

    return {
      data: user,
      statusCode: HttpStatusCode.CREATED,
    }
  }
}
