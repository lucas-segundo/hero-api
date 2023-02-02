import { DbRaceFinder } from 'app/use-cases/db-race-finder'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexRaceFinderRepository } from 'infra/knex/repositories/race-finder'

export const makeRaceFinder = () => {
  const repo = new KnexRaceFinderRepository(KnexDbHandler.client)
  return new DbRaceFinder(repo)
}
