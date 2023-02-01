import { faker } from '@faker-js/faker'
import { RaceFinder, RaceFinderParams } from '.'

export const mockRaceFinderParams = (): RaceFinderParams => ({
  id: faker.datatype.uuid(),
})

export const mockRaceFinder = (): jest.Mocked<RaceFinder> => ({
  find: jest.fn(),
})
