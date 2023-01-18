import { UserCreater, UserCreaterParams } from 'domain/use-cases/user-creater'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { HttpErrorResponse, HttpResponse } from 'presentation/protocols/http'

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
        statusCode: 403,
      }
    }

    await this.userCreater.create(params)

    return {
      data: null,
      statusCode: 200,
    }
  }
}
