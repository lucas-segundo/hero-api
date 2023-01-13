import {
  UserCreater,
  UserCreaterParams,
} from 'core/domain/use-cases/user-creater'
import { MissingParamError } from 'core/presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
} from 'core/presentation/protocols/http'

export class UserCreation {
  constructor(private readonly userCreater: UserCreater) {}

  async handle(
    requestData: UserCreaterParams
  ): Promise<HttpResponse | HttpErrorResponse> {
    const errors = []

    const { name, email, password } = requestData
    !name && errors.push(new MissingParamError('name'))
    !email && errors.push(new MissingParamError('email'))
    !password && errors.push(new MissingParamError('password'))

    if (errors.length) {
      return {
        errors,
        statusCode: 403,
      }
    }

    await this.userCreater.create(requestData)

    return {
      data: null,
      statusCode: 200,
    }
  }
}
