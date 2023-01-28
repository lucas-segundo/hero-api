import {
  mockRaceCreation,
  mockRaceCreationParams,
} from 'domain/use-cases/race-creation/mock'
import { RaceCreationController } from '.'

describe('RaceCreationController', () => {
  it('should call race creation with right params', async () => {
    const raceCreation = mockRaceCreation()
    const sut = new RaceCreationController(raceCreation)

    const params = mockRaceCreationParams()
    await sut.handle(params)

    expect(raceCreation.create).toBeCalledWith(params)
  })
})
