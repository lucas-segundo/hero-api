import { faker } from '@faker-js/faker'
import { KnownError } from 'domain/errors/known-error'
import { Race } from 'domain/models/race'
import { mockRace } from 'domain/models/race/mock'
import { RaceFinderParams } from 'domain/use-cases/race-finder'
import {
  mockRaceFinder,
  mockRaceFinderParams,
} from 'domain/use-cases/race-finder/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
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

  it('should respond with error if required params are missing', async () => {
    const raceFinder = mockRaceFinder()
    const sut = new RaceFinderController(raceFinder)

    const params: RaceFinderParams = mockRaceFinderParams()
    delete params.id
    const result = await sut.handle(params)

    const httpErrorResponse: HttpErrorResponse = {
      errors: [new MissingParamError('id').message],
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(result).toEqual(httpErrorResponse)
  })

  it('should respond with known error if an expected error has happened', async () => {
    const raceFinder = mockRaceFinder()
    const sut = new RaceFinderController(raceFinder)

    const error = new KnownError(faker.random.words())
    raceFinder.find.mockRejectedValueOnce(error)
    const result = await sut.handle(mockRaceFinderParams())

    const httpErrorResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(result).toEqual(httpErrorResponse)
  })
})
