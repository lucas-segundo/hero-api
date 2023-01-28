import {
  mockRaceCreated,
  mockRaceCreation,
  mockRaceCreationParams,
} from 'domain/use-cases/race-creation/mock'
import { HttpResponse, HttpStatusCode } from 'presentation/protocols/http'
import { RaceCreationController } from '.'

const makeSut = () => {
  const raceCreation = mockRaceCreation()
  const sut = new RaceCreationController(raceCreation)

  return {
    raceCreation,
    sut,
  }
}

describe('RaceCreationController', () => {
  it('should call race creation with right params', async () => {
    const { sut, raceCreation } = makeSut()

    const params = mockRaceCreationParams()
    await sut.handle(params)

    expect(raceCreation.create).toBeCalledWith(params)
  })

  it('should respond with race created', async () => {
    const { sut, raceCreation } = makeSut()
    const raceCreated = mockRaceCreated()
    raceCreation.create.mockResolvedValueOnce(raceCreated)

    const params = mockRaceCreationParams()
    const response = await sut.handle(params)

    const expectedResponse: HttpResponse = {
      data: raceCreated,
      statusCode: HttpStatusCode.OK,
    }

    expect(response).toEqual(expectedResponse)
  })
})
