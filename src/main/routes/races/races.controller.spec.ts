import { Test, TestingModule } from '@nestjs/testing'
import { mockRaceCreationParams } from 'domain/use-cases/race-creation/mock'
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
    await controller.create(params)

    expect(createSpy).toBeCalledWith(params)
  })
})
