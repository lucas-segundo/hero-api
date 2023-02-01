import { Race } from 'domain/models/race'
import { mockRace } from 'domain/models/race/mock'
import { RaceFinderParams } from 'domain/use-cases/race-finder'
import {
  mockRaceFinder,
  mockRaceFinderParams,
} from 'domain/use-cases/race-finder/mock'
import { HttpResponse, HttpStatusCode } from 'presentation/protocols/http'
import { RaceFinderController } from '.'

describe('RaceFinderController', () => {
  it('should call race finder with right params', async () => {
    const raceFinder = mockRaceFinder()
    const sut = new RaceFinderController(raceFinder)

    const params: RaceFinderParams = mockRaceFinderParams()
    await sut.handle(params)

    expect(raceFinder.find).toBeCalledWith(params)
  })

  it('should respond with correct data', async () => {
    const raceFinder = mockRaceFinder()
    const sut = new RaceFinderController(raceFinder)

    const race = mockRace()
    raceFinder.find.mockResolvedValueOnce(race)

    const params: RaceFinderParams = mockRaceFinderParams()
    const data = await sut.handle(params)

    const expectedResponse: HttpResponse<Race> = {
      data: race,
      statusCode: HttpStatusCode.CREATED,
    }

    expect(data).toEqual(expectedResponse)
  })
})
