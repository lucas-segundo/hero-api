import { UserFinderRepository } from 'app/protocols/user-finder-repository'
import {
  UserAuthentication,
  UserAuthenticationParams,
  UserAuthenticationResult,
} from 'domain/use-cases/user-authentication'

export class DbUserAuthentication implements UserAuthentication {
  constructor(private userFinderRepository: UserFinderRepository) {}

  async auth({
    email,
  }: UserAuthenticationParams): Promise<UserAuthenticationResult> {
    await this.userFinderRepository.find({
      by: 'email',
      value: email,
    })

    return null
  }
}
