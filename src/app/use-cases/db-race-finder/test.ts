import {
  mockRaceFinderRepository,
  mockRaceFinderRepositoryModel,
} from 'app/protocols/race-finder-repository/mock'
import { Race } from 'domain/models/race'
import { mockRaceFinderParams } from 'domain/use-cases/race-finder/mock'
import { DbRaceFinder } from '.'

const makeSut = () => {
  const raceFinderRepo = mockRaceFinderRepository()
  const sut = new DbRaceFinder(raceFinderRepo)

  return {
    sut,
    raceFinderRepo,
  }
}

describe('DbRaceFinder', () => {
  it('should call repo with right params', async () => {
    const { sut, raceFinderRepo } = makeSut()

    const raceFinderRepoModel = mockRaceFinderRepositoryModel()
    raceFinderRepo.find.mockResolvedValueOnce(raceFinderRepoModel)

    const params = mockRaceFinderParams()
    await sut.find(params)

    expect(raceFinderRepo.find).toBeCalledWith(params)
  })

  it('should return model data', async () => {
    const { sut, raceFinderRepo } = makeSut()

    const raceFinderRepoModel = mockRaceFinderRepositoryModel()
    raceFinderRepo.find.mockResolvedValueOnce(raceFinderRepoModel)

    const params = mockRaceFinderParams()
    const race = await sut.find(params)

    const expectedRace: Race = {
      id: raceFinderRepoModel.id.toString(),
      title: raceFinderRepoModel.title,
    }
    expect(race).toEqual(expectedRace)
  })
})
