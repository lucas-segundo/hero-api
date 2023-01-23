import { DataNotFoundError } from 'app/errors/data-not-found-error'
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
    private hashComparer: HashComparer
  ) {}

  async auth({
    email,
  }: UserAuthenticationParams): Promise<UserAuthenticationResult> {
    const user = await this.userFinderRepository.find({
      by: 'email',
      value: email,
    })

    if (!user) {
      throw new DataNotFoundError('User')
    }

    return null
  }
}
