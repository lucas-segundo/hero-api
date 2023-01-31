import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { mockRace } from 'domain/models/race/mock'
import { mockRaceCreationParams } from 'domain/use-cases/race-creation/mock'
import { mockExpressResponse } from 'main/helpers/mock-express-response'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
import { makeRacesModule } from './factory.module'
import { RacesController } from './races.controller'
import { RacesService } from './races.service'

describe('RacesController', () => {
  let controller: RacesController
  let service: RacesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      makeRacesModule()
    ).compile()

    controller = module.get<RacesController>(RacesController)
    service = module.get<RacesService>(RacesService)
  })

  it('should call service.create with right params', async () => {
    const params = mockRaceCreationParams()
    const createSpy = jest.spyOn(service, 'create')
    const res = mockExpressResponse()
    await controller.create(params, res)

    expect(createSpy).toBeCalledWith(params)
  })

  it('should service.create respond with right data', async () => {
    const createSpy = jest.spyOn(service, 'create')
    const result: HttpResponse = {
      data: mockRace(),
      statusCode: HttpStatusCode.CREATED,
    }
    createSpy.mockResolvedValueOnce(result)

    const res = mockExpressResponse()
    const params = mockRaceCreationParams()
    await controller.create(params, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ data: result.data })
  })

  it('should service.create respond with right error if it fails', async () => {
    const createSpy = jest.spyOn(service, 'create')
    const result: HttpErrorResponse = {
      errors: [faker.random.words()],
      statusCode: faker.internet.httpStatusCode({
        types: ['serverError', 'clientError'],
      }),
    }
    createSpy.mockResolvedValueOnce(result)

    const res = mockExpressResponse()
    const params = mockRaceCreationParams()
    await controller.create(params, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ errors: result.errors })
  })
})
