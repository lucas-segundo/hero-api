import { RaceCreationRepository } from '.'

export const mockRaceCreationRepository =
  (): jest.Mocked<RaceCreationRepository> => ({
    create: jest.fn(),
  })
