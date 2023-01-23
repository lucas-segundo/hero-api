import { DataNotFoundError } from 'app/errors/data-not-found-error'
import { WrongPasswordError } from 'app/errors/wrong-password-error'
import { Encrypter } from 'app/protocols/encrypter'
import { HashComparer } from 'app/protocols/hash-comparer'
import { UserFinderRepository } from 'app/protocols/user-finder-repository'
import {
  UserAuthentication,
  UserAuthenticationParams,
  UserAuthenticationResult,
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
  }: UserAuthenticationParams): Promise<UserAuthenticationResult> {
    const user = await this.userFinderRepository.find({
      by: 'email',
      value: email,
    })

    if (!user) {
      throw new DataNotFoundError('User')
    }

    const isEqual = await this.hashComparer.compare({
      hashedValue: user.passwordHashed,
      value: password,
    })

    if (!isEqual) {
      throw new WrongPasswordError()
    }

    const { id } = user
    await this.encrypter.encrypt({
      payload: { id },
    })

    return null
  }
}
