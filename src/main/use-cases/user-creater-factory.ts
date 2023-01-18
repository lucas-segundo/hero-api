import { DbUserCreater } from 'app/use-cases/db-user-creater'
import { BcryptEncrypter } from 'infra/bcrypt'
import dbKnexClient from 'infra/knex/config/db-client'
import { KnexUserCreaterRepository } from 'infra/knex/repositories/user-creater'

export const makeUserCreater = () => {
  const repository = new KnexUserCreaterRepository(dbKnexClient)
  const encrypter = new BcryptEncrypter()

  return new DbUserCreater(repository, encrypter)
}
