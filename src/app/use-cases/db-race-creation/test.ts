import {
  mockRaceCreationRepository,
  mockRaceCreationRepositoryModel,
  mockRaceCreationRepositoryParams,
} from 'app/protocols/race-creation-repository/mock'
import { RaceCreated } from 'domain/use-cases/race-creation'
import { DbRaceCreation } from '.'

const makeSut = () => {
  const raceCreationRepo = mockRaceCreationRepository()
  const sut = new DbRaceCreation(raceCreationRepo)

  const params = mockRaceCreationRepositoryParams()
  const raceCreatedRepo = mockRaceCreationRepositoryModel()

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
