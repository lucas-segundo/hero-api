import { RaceFinderRepositoryModel } from 'app/protocols/race-finder-repository'
import {
  mockRaceFinderRepositoryModel,
  mockRaceFinderRepositoryParams,
} from 'app/protocols/race-finder-repository/mock'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { Knex } from 'knex'
import { KnexRaceFinderRepository } from '.'

const makeSut = (client = KnexDbHandler.client) => {
  const sut = new KnexRaceFinderRepository(client)

  return {
    sut,
  }
}

describe('KnexRaceFinderRepository', () => {
  let expectedRaceRepoModel: RaceFinderRepositoryModel

  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()

    const raceToInsert = mockRaceFinderRepositoryModel()
    delete raceToInsert.id

    const races = await KnexDbHandler.client
      .insert(raceToInsert, ['*'])
      .into('races')

    expectedRaceRepoModel = races[0]
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call knex with right params', async () => {
    const client = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
    } as unknown as Knex

    const sut = new KnexRaceFinderRepository(client)

    const params = mockRaceFinderRepositoryParams()
    await sut.find(params)

    expect(client.select).toBeCalledWith('*')
    expect(client.from).toBeCalledWith('races')
    expect(client.where).toBeCalledWith('id', params.id)
    expect(client.first).toBeCalled()
  })

  it('should find a race', async () => {
    const { sut } = makeSut()

    const raceRepoModel = await sut.find({ id: expectedRaceRepoModel.id })

    expect(raceRepoModel).toEqual(expectedRaceRepoModel)
  })
})
