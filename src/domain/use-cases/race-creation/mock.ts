import { faker } from '@faker-js/faker'
import { RaceCreation, RaceCreationParams } from '.'

export const mockRaceCreation = (): jest.Mocked<RaceCreation> => ({
  create: jest.fn(),
})

export const mockRaceCreationParams = (): RaceCreationParams => ({
  title: faker.random.word(),
})
