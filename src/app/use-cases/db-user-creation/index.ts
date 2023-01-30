import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Hasher } from 'app/protocols/hasher'
import { UserCreationRepository } from 'app/protocols/user-creater-repository'
import { User } from 'domain/models/user'
import {
  UserCreation,
  UserCreationParams,
} from 'domain/use-cases/user-creation'

export class DbUserCreation implements UserCreation {
  constructor(
    private readonly UserCreationRepository: UserCreationRepository,
    private readonly hasher: Hasher
  ) {}

  async create({ email, name, password }: UserCreationParams): Promise<User> {
    try {
      const passwordHashed = await this.hasher.hash({
        value: password,
      })
      const { id } = await this.UserCreationRepository.create({
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
