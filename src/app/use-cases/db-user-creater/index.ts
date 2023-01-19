import { UnexpectedError } from 'app/errors/unexpected-error'
import { Encrypter } from 'app/protocols/encrypter'
import { UserCreaterRepository } from 'app/protocols/user-creater-repository'
import { User } from 'domain/models/user'
import { UserCreater, UserCreaterParams } from 'domain/use-cases/user-creater'

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
      console.log(error)
      throw new UnexpectedError()
    }
  }
}
