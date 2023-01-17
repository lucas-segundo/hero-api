import { mockUserCreaterParams } from 'core/domain/use-cases/user-creater/mock'
import { KnexUserCreaterRepository } from '.'
import dbKnexClient from '../../config/db-client'

describe('KnexUserCreaterRepository', () => {
  beforeAll(async () => {
    await dbKnexClient.migrate.latest()
  })

  afterAll(async () => {
    await dbKnexClient.destroy()
  })

  it('should call client with right params', async () => {
    const insertSpy = jest.spyOn(dbKnexClient, 'insert')
    const sut = new KnexUserCreaterRepository(dbKnexClient)
    const userCreaterParams = mockUserCreaterParams()

    await sut.create(userCreaterParams)

    expect(insertSpy).toBeCalledWith(userCreaterParams)
  })
})
