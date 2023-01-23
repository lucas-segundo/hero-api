import { Hasher } from '.'

export const mockHasher = (): jest.Mocked<Hasher> => ({
  hash: jest.fn(),
})
