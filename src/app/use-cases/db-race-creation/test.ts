import {
  mockRaceCreaterRepository,
  mockRaceCreaterRepositoryModel,
  mockRaceCreaterRepositoryParams,
} from 'app/protocols/race-creater-repository/mock'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Race } from 'domain/models/race'
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
    const { sut, params, raceCreationRepo, raceCreatedRepo } = makeSut()
    raceCreationRepo.create.mockResolvedValueOnce(raceCreatedRepo)

    await sut.create(params)

    expect(raceCreationRepo.create).toBeCalledWith(params)
  })

  it('should return race created', async () => {
    const { sut, raceCreationRepo, params, raceCreatedRepo } = makeSut()

    raceCreationRepo.create.mockResolvedValueOnce(raceCreatedRepo)

    const data = await sut.create(params)

    const expectedData: Race = {
      id: raceCreatedRepo.id.toString(),
      title: raceCreatedRepo.title,
    }
    expect(data).toEqual(expectedData)
  })

  it('should throw unexpected error if something wrong happened', async () => {
    const { sut, raceCreationRepo, params } = makeSut()

    raceCreationRepo.create.mockRejectedValueOnce(new Error())

    const result = sut.create(params)

    expect(result).rejects.toThrowError(new UnexpectedError())
  })
})
