import { mockUserCreaterRepositoryParams } from 'app/protocols/user-creater-repository/mock'
import { User } from 'domain/models/user'
import { KnexUserCreaterRepository } from '.'
import { KnexDbHandler } from '../../config/knex-db-handler'

const makeSut = (dbClient = KnexDbHandler.client) => {
  const sut = new KnexUserCreaterRepository(dbClient)
  const insertSpy = jest.spyOn(dbClient, 'insert')
  const userCreaterParams = mockUserCreaterRepositoryParams()

  return {
    sut,
    insertSpy,
    userCreaterParams,
  }
}

describe('KnexUserCreaterRepository', () => {
  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call client with right params', async () => {
    const { sut, insertSpy, userCreaterParams } = makeSut()

    await sut.create(userCreaterParams)

    expect(insertSpy).toBeCalledWith(userCreaterParams)
  })

  it('should return the user created', async () => {
    const { sut, userCreaterParams } = makeSut()

    const user = await sut.create(userCreaterParams)
    const tableRows = await KnexDbHandler.client('users').count()
    const id = tableRows[0]['count(*)'].toString()

    const expectedUser: User = { id, ...userCreaterParams }
    expect(user).toEqual(expectedUser)
  })
})
