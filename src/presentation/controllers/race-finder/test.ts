import { RaceFinderParams } from 'domain/use-cases/race-finder'
import {
  mockRaceFinder,
  mockRaceFinderParams,
} from 'domain/use-cases/race-finder/mock'
import { RaceFinderController } from '.'

describe('RaceFinderController', () => {
  it('should call race finder with right params', async () => {
    const raceFinder = mockRaceFinder()
    const sut = new RaceFinderController(raceFinder)

    const params: RaceFinderParams = mockRaceFinderParams()
    await sut.find(params)

    expect(raceFinder.find).toBeCalledWith(params)
  })
})
