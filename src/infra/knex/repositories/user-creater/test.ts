import { UserCreationRepositoryModel } from 'app/protocols/user-creater-repository'
import { mockUserCreationRepositoryParams } from 'app/protocols/user-creater-repository/mock'
import { KnexUserCreationRepository } from '.'
import { KnexDbHandler } from '../../config/knex-db-handler'

const makeSut = (dbClient = KnexDbHandler.client) => {
  const sut = new KnexUserCreationRepository(dbClient)
  const insertSpy = jest.spyOn(dbClient, 'insert')
  const UserCreationParams = mockUserCreationRepositoryParams()

  return {
    sut,
    insertSpy,
    UserCreationParams,
  }
}

describe('KnexUserCreationRepository', () => {
  beforeAll(async () => {
    KnexDbHandler.connect('test')
    await KnexDbHandler.migrateLatest()
  })

  afterAll(async () => {
    await KnexDbHandler.disconnect()
  })

  it('should call client with right params', async () => {
    const { sut, insertSpy, UserCreationParams } = makeSut()

    await sut.create(UserCreationParams)

    expect(insertSpy).toBeCalledWith(UserCreationParams)
  })

  it('should return the user created', async () => {
    const { sut, UserCreationParams } = makeSut()

    const user = await sut.create(UserCreationParams)
    const tableRows = await KnexDbHandler.client('users').count()
    const id = tableRows[0]['count(*)'].toString()

    const expectedUser: UserCreationRepositoryModel = { id }
    expect(user).toEqual(expectedUser)
  })
})
