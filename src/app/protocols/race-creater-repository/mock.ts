import { faker } from '@faker-js/faker'
import {
  RaceCreaterRepository,
  RaceCreaterRepositoryModel,
  RaceCreaterRepositoryParams,
} from '.'

export const mockRaceCreaterRepositoryParams =
  (): RaceCreaterRepositoryParams => ({
    title: faker.random.words(),
  })

export const mockRaceCreaterRepositoryModel =
  (): RaceCreaterRepositoryModel => ({
    id: faker.datatype.uuid(),
  })

export const mockRaceCreaterRepository =
  (): jest.Mocked<RaceCreaterRepository> => ({
    create: jest.fn(),
  })
