import { UnexpectedError } from 'core/app/errors/unexpected-error'
import { Encrypter } from 'core/app/protocols/encrypter'
import { UserCreaterRepository } from 'core/app/protocols/user-creater-repository'
import { User } from 'core/domain/models/user'
import {
  UserCreater,
  UserCreaterParams,
} from 'core/domain/use-cases/user-creater'

export class DbUserCreater implements UserCreater {
  constructor(
    private readonly userCreaterRepository: UserCreaterRepository,
    private readonly encrypter: Encrypter
  ) {}

  async create({ email, name, password }: UserCreaterParams): Promise<User> {
    try {
      const passwordHashed = await this.encrypter.encrypt({
        value: password,
      })
      const userCreated = await this.userCreaterRepository.create({
        email,
        name,
        passwordHashed,
      })

      return userCreated
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
