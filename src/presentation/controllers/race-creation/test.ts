import { faker } from '@faker-js/faker'
import { KnownError } from 'domain/errors/known-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import {
  mockRaceCreated,
  mockRaceCreation,
  mockRaceCreationParams,
} from 'domain/use-cases/race-creation/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
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

  it('should respond with error if requests is missing required params', async () => {
    const { sut } = makeSut()
    const params = mockRaceCreationParams()
    delete params.title
    const response = await sut.handle(params)

    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('title')],
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should respond with error if requests is missing required params', async () => {
    const { sut } = makeSut()
    const params = mockRaceCreationParams()
    delete params.title
    const response = await sut.handle(params)

    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('title')],
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should respond with error if known error happens', async () => {
    const { sut, raceCreation } = makeSut()

    const error = new KnownError(faker.random.words())
    raceCreation.create.mockRejectedValueOnce(error)

    const params = mockRaceCreationParams()
    const response = await sut.handle(params)

    const expectedResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should respond with error if something wrong happens', async () => {
    const { sut, raceCreation } = makeSut()
    raceCreation.create.mockRejectedValueOnce(new Error())

    const params = mockRaceCreationParams()
    const response = await sut.handle(params)

    const expectedResponse: HttpErrorResponse = {
      errors: [new UnexpectedError().message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(response).toEqual(expectedResponse)
  })
})
