import {
  UserCreater,
  UserCreaterParams,
} from 'core/domain/use-cases/user-creater'
import { Controller } from 'core/presentation/protocols/controller'
import { HttpResponse } from 'core/presentation/protocols/http'

export class UserCreation implements Controller {
  constructor(private readonly userCreater: UserCreater) {}

  async handle(requestData: UserCreaterParams): Promise<HttpResponse> {
    await this.userCreater.create(requestData)

    return {
      data: null,
      statusCode: 200,
    }
  }
}
