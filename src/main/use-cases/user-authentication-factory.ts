import { DbUserAuthentication } from 'app/use-cases/db-user-authentication'
import { BcryptHashComparer } from 'infra/bcrypt/hash-comparer'
import { JwtEncrypter } from 'infra/jwt'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexUserFinderRepository } from 'infra/knex/repositories/user-finder'

export const makeUserAuthentication = () => {
  const userAuthRepo = new KnexUserFinderRepository(KnexDbHandler.client)
  const hashComparer = new BcryptHashComparer()
  const encrypter = new JwtEncrypter()

  return new DbUserAuthentication(userAuthRepo, hashComparer, encrypter)
}
