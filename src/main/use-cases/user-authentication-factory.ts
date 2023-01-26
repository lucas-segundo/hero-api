import { LocalUserAuthentication } from 'app/use-cases/local-user-authentication'
import { BcryptHashComparer } from 'infra/bcrypt/hash-comparer'
import { JwtEncrypter } from 'infra/jwt'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexUserFinderRepository } from 'infra/knex/repositories/user-finder'

export const makeUserAuthentication = () => {
  const userAuthRepo = new KnexUserFinderRepository(KnexDbHandler.client)
  const hashComparer = new BcryptHashComparer()
  const encrypter = new JwtEncrypter()

  return new LocalUserAuthentication(userAuthRepo, hashComparer, encrypter)
}
