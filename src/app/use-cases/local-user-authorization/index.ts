import { TokenPayload } from 'app/models/token-payload'
import { Dencrypter } from 'app/protocols/dencrypter'
import {
  UserAuthorization,
  UserAuthorizationParams,
} from 'domain/use-cases/user-authorization'

export class LocalUserAuthorization implements UserAuthorization {
  constructor(private dencrypter: Dencrypter) {}
  async auth(params: UserAuthorizationParams): Promise<boolean> {
    const tokenPayload = await this.dencrypter.dencrypt<TokenPayload>(params)

    return !!tokenPayload
  }
}
