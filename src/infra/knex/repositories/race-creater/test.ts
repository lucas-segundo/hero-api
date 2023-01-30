import { mockRaceCreaterRepositoryParams } from 'app/protocols/race-creater-repository/mock'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { Knex } from 'knex'
import { KnexRaceCreaterRepository } from '.'

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
    const sut = new KnexRaceCreaterRepository(client)

    const params = mockRaceCreaterRepositoryParams()
    await sut.create(params)

    expect(client.insert).toBeCalledWith(params)
    expect(client.into).toBeCalledWith('races')
  })
})
