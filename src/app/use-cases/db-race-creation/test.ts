import {
  mockRaceCreaterRepository,
  mockRaceCreaterRepositoryModel,
  mockRaceCreaterRepositoryParams,
} from 'app/protocols/race-creater-repository/mock'
import { RaceCreated } from 'domain/use-cases/race-creation'
import { DbRaceCreation } from '.'

const makeSut = () => {
  const raceCreationRepo = mockRaceCreaterRepository()
  const sut = new DbRaceCreation(raceCreationRepo)

  const params = mockRaceCreaterRepositoryParams()
  const raceCreatedRepo = mockRaceCreaterRepositoryModel()

  return {
    sut,
    raceCreationRepo,
    params,
    raceCreatedRepo,
  }
}

describe('DbRaceCreation', () => {
  it('should call race creation repo with right params', async () => {
    const { sut, params, raceCreationRepo } = makeSut()
    await sut.create(params)

    expect(raceCreationRepo.create).toBeCalledWith(params)
  })

  it('should return race created', async () => {
    const { sut, raceCreationRepo, params, raceCreatedRepo } = makeSut()

    raceCreationRepo.create.mockResolvedValueOnce(raceCreatedRepo)

    const data = await sut.create(params)

    const expectedData: RaceCreated = {
      id: raceCreatedRepo.id,
    }
    expect(data).toEqual(expectedData)
  })
})
