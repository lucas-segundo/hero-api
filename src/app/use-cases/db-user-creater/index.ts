import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Hasher } from 'app/protocols/hasher'
import { UserCreaterRepository } from 'app/protocols/user-creater-repository'
import { User } from 'domain/models/user'
import { UserCreater, UserCreaterParams } from 'domain/use-cases/user-creater'

export class DbUserCreater implements UserCreater {
  constructor(
    private readonly userCreaterRepository: UserCreaterRepository,
    private readonly hasher: Hasher
  ) {}

  async create({ email, name, password }: UserCreaterParams): Promise<User> {
    try {
      const passwordHashed = await this.hasher.hash({
        value: password,
      })
      const { id } = await this.userCreaterRepository.create({
        email,
        name,
        passwordHashed,
      })

      return {
        id,
        name,
        email,
      }
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}
