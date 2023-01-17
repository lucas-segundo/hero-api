import { mockUserCreaterRepositoryParams } from 'core/app/protocols/user-creater-repository/mock'
import { User } from 'core/domain/models/user'
import { mockUserCreaterParams } from 'core/domain/use-cases/user-creater/mock'
import { KnexUserCreaterRepository } from '.'
import dbKnexClient from '../../config/db-client'

const makeSut = () => {
  const sut = new KnexUserCreaterRepository(dbKnexClient)
  const insertSpy = jest.spyOn(dbKnexClient, 'insert')
  const userCreaterParams = mockUserCreaterRepositoryParams()

  return {
    sut,
    insertSpy,
    userCreaterParams,
  }
}

describe('KnexUserCreaterRepository', () => {
  beforeAll(async () => {
    await dbKnexClient.migrate.latest()
  })

  afterAll(async () => {
    await dbKnexClient.destroy()
  })

  it('should call client with right params', async () => {
    const { sut, insertSpy, userCreaterParams } = makeSut()

    await sut.create(userCreaterParams)

    expect(insertSpy).toBeCalledWith(userCreaterParams)
  })

  it('should returns the user created', async () => {
    const { sut, userCreaterParams } = makeSut()

    const user = await sut.create(userCreaterParams)
    const tableRows = await dbKnexClient('users').count()
    const id = tableRows[0]['count(*)'].toString()

    const expectedUser: User = { id, ...userCreaterParams }
    expect(user).toEqual(expectedUser)
  })
})
