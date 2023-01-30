import { faker } from '@faker-js/faker'
import {
  UserFinderRepositoryModel,
  UserFinderRepositoryParams,
} from 'app/protocols/user-finder-repository'
import { mockUserFinderRepositoryModel } from 'app/protocols/user-finder-repository/mock'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { Knex } from 'knex'
import { KnexUserFinderRepository } from '.'

const mockUser = () => {
  const sut = new KnexUserFinderRepository(KnexDbHandler.client)

  return {
    sut,
  }
}

describe('KnexUserFinderRepository', () => {
  let expectedDbUser: UserFinderRepositoryModel

  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()

    const userToInsert = mockUserFinderRepositoryModel()
    delete userToInsert.id

    const ids = await KnexDbHandler.client.insert(userToInsert).into('users')
    expectedDbUser = {
      id: ids[0],
      ...userToInsert,
    }
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call client with right params', async () => {
    const client = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
    } as unknown as Knex

    const sut = new KnexUserFinderRepository(client)

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

  it('should return a user', async () => {
    const { sut } = mockUser()

    const params: UserFinderRepositoryParams = {
      by: 'email',
      value: expectedDbUser.email,
    }

    const user = await sut.find(params)

    expect(user).toEqual(expectedDbUser)
  })
})
