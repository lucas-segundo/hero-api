import { RaceCreaterRepositoryModel } from 'app/protocols/race-creater-repository'
import { mockRaceCreaterRepositoryParams } from 'app/protocols/race-creater-repository/mock'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { RacesSchema } from 'infra/knex/schemas/races'
import { Knex } from 'knex'
import { KnexRaceCreaterRepository } from '.'

const makeSut = (client = KnexDbHandler.client) => {
  const sut = new KnexRaceCreaterRepository(client)

  const params = mockRaceCreaterRepositoryParams()

  return {
    sut,
    params,
  }
}

describe('KnexRaceCreaterRepository', () => {
  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call client with right params', async () => {
    const client = {
      insert: jest.fn().mockReturnThis(),
      into: jest.fn().mockReturnThis(),
    } as unknown as Knex
    jest.spyOn(client, 'into').mockResolvedValueOnce([{ id: 1 }])
    const sut = new KnexRaceCreaterRepository(client)

    const params = mockRaceCreaterRepositoryParams()
    await sut.create(params)

    expect(client.insert).toBeCalledWith(params, ['*'])
    expect(client.into).toBeCalledWith('races')
  })

  it('should return model data', async () => {
    const client = KnexDbHandler.client
    const { sut, params } = makeSut(client)

    const model = await sut.create(params)
    const firstRow = await client.select<RacesSchema>('*').from('races').first()

    const expectedModel: RaceCreaterRepositoryModel = {
      id: firstRow.id.toString(),
    }

    expect(model).toEqual(expectedModel)
  })
})
