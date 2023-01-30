import { faker } from '@faker-js/faker'
import {
  RaceCreationRepository,
  RaceCreationRepositoryModel,
  RaceCreationRepositoryParams,
} from '.'

export const mockRaceCreationRepositoryParams =
  (): RaceCreationRepositoryParams => ({
    title: faker.random.words(),
  })

export const mockRaceCreationRepositoryModel =
  (): RaceCreationRepositoryModel => ({
    id: faker.datatype.uuid(),
  })

export const mockRaceCreationRepository =
  (): jest.Mocked<RaceCreationRepository> => ({
    create: jest.fn(),
  })
