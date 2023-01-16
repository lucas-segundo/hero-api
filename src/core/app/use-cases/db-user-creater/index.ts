import { UnexpectedError } from 'core/app/errors/unexpected-error'
import { UserCreaterRepository } from 'core/app/protocols/user-creater-repository'
import { User } from 'core/domain/models/user'
import {
  UserCreater,
  UserCreaterParams,
} from 'core/domain/use-cases/user-creater'

export class DbUserCreater implements UserCreater {
  constructor(private readonly userCreaterRepository: UserCreaterRepository) {}

  async create(params: UserCreaterParams): Promise<User> {
    try {
      const userCreated = await this.userCreaterRepository.create(params)

      return userCreated
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
