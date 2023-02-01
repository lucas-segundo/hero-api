import { faker } from '@faker-js/faker'
import {
  RaceFinderRepository,
  RaceFinderRepositoryModel,
  RaceFinderRepositoryParams,
} from '.'

export const mockRaceFinderRepositoryModel = (): RaceFinderRepositoryModel => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
})

export const mockRaceFinderRepository =
  (): jest.Mocked<RaceFinderRepository> => ({
    find: jest.fn(),
  })

export const mockRaceFinderRepositoryParams =
  (): RaceFinderRepositoryParams => ({
    id: faker.datatype.uuid(),
  })
