import { mockRaceFinderRepository } from 'app/protocols/race-finder-repository/mock'
import { mockRaceFinderParams } from 'domain/use-cases/race-finder/mock'
import { DbRaceFinder } from '.'

describe('DbRaceFinder', () => {
  it('should call repo with right params', async () => {
    const raceFinderRepo = mockRaceFinderRepository()
    const sut = new DbRaceFinder(raceFinderRepo)

    const params = mockRaceFinderParams()
    await sut.find(params)

    expect(raceFinderRepo.find).toBeCalledWith(params)
  })
})
