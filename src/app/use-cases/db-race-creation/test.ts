import { mockRaceCreationRepository } from 'app/protocols/race-creation-repository/mock'
import { mockRaceCreationParams } from 'domain/use-cases/race-creation/mock'
import { DbRaceCreation } from '.'

describe('DbRaceCreation', () => {
  it('should call race creation repo with right params', async () => {
    const raceCreationRepo = mockRaceCreationRepository()
    const sut = new DbRaceCreation(raceCreationRepo)

    const params = mockRaceCreationParams()
    await sut.create(params)

    expect(raceCreationRepo.create).toBeCalledWith(params)
  })
})
