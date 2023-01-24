import { faker } from '@faker-js/faker'
import { UserFinderRepositoryParams } from 'app/protocols/user-finder-repository'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { Knex } from 'knex'
import { KnexUserFinderRepository } from '.'

describe('KnexUserFinderRepository', () => {
  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call client with right params', async () => {
    const client: Partial<jest.Mocked<Knex>> = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
    }
    const sut = new KnexUserFinderRepository(client as unknown as Knex)

    const params: UserFinderRepositoryParams = {
      by: 'email',
      value: faker.internet.email(),
    }

    await sut.find(params)

    expect(client.select).toBeCalledWith('*')
    expect(client.from).toBeCalledWith('users')
    expect(client.where).toBeCalledWith(params.by, params.value)
    expect(client.first).toBeCalled()
  })
})
