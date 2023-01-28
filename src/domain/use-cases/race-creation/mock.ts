import { faker } from '@faker-js/faker'
import { RaceCreated, RaceCreation, RaceCreationParams } from '.'

export const mockRaceCreation = (): jest.Mocked<RaceCreation> => ({
  create: jest.fn(),
})

export const mockRaceCreationParams = (): RaceCreationParams => ({
  title: faker.random.word(),
})

export const mockRaceCreated = (): RaceCreated => ({
  id: faker.datatype.uuid(),
})
