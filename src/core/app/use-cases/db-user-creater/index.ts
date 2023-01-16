import { UserCreaterRepository } from 'core/app/protocols/user-creater-repository'
import {
  UserCreater,
  UserCreaterParams,
} from 'core/domain/use-cases/user-creater'

export class DbUserCreater implements UserCreater {
  constructor(private readonly userCreaterRepository: UserCreaterRepository) {}

  async create(params: UserCreaterParams): Promise<UserCreater> {
    await this.userCreaterRepository.create(params)

    return null
  }
}
