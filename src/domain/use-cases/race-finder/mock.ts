import { RaceFinder } from '.'

export const mockRaceFinder = (): jest.Mocked<RaceFinder> => ({
  find: jest.fn(),
})
