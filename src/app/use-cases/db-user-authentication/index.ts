import { KnownError } from 'app/errors/known-error'
import { DataNotFoundError } from 'app/errors/data-not-found-error'
import { UnexpectedError } from 'app/errors/unexpected-error'
import { WrongPasswordError } from 'app/errors/wrong-password-error'
import { Encrypter } from 'app/protocols/encrypter'
import { HashComparer } from 'app/protocols/hash-comparer'
import { UserFinderRepository } from 'app/protocols/user-finder-repository'
import {
  AuthenticatedUser,
  UserAuthentication,
  UserAuthenticationParams,
} from 'domain/use-cases/user-authentication'

export class DbUserAuthentication implements UserAuthentication {
  constructor(
    private userFinderRepository: UserFinderRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async auth({
    email,
    password,
  }: UserAuthenticationParams): Promise<AuthenticatedUser> {
    try {
      const user = await this.findUser(email)

      await this.checkIfPasswordIsRight(user.passwordHashed, password)

      const token = await this.createToken(user.id)

      return {
        token,
        user,
      }
    } catch (error) {
      if (error instanceof KnownError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }

  async findUser(email: string) {
    const user = await this.userFinderRepository.find({
      by: 'email',
      value: email,
    })

    if (!user) {
      throw new DataNotFoundError('User')
    }

    return user
  }

  async checkIfPasswordIsRight(passwordHashed: string, password: string) {
    const isEqual = await this.hashComparer.compare({
      hashedValue: passwordHashed,
      value: password,
    })

    if (!isEqual) {
      throw new WrongPasswordError()
    }
  }

  async createToken(id: string) {
    const token = await this.encrypter.encrypt({
      payload: { id },
    })

    return token
  }
}
