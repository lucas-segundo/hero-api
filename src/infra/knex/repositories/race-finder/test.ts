import { mockRaceFinderRepositoryParams } from 'app/protocols/race-finder-repository/mock'
import { Knex } from 'knex'
import { KnexRaceFinderRepository } from '.'

describe('KnexRaceFinderRepository', () => {
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
})
