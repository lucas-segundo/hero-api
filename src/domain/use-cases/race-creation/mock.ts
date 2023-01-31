import { faker } from '@faker-js/faker'
import { Race } from 'domain/models/race'
import { RaceCreation, RaceCreationParams } from '.'

export const mockRaceCreation = (): jest.Mocked<RaceCreation> => ({
  create: jest.fn(),
})

export const mockRaceCreationParams = (): RaceCreationParams => ({
  title: faker.random.word(),
})

export const mockRaceCreated = (): Race => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
})
