import { Encrypter } from '.'

export const mockEncrypter = (): jest.Mocked<Encrypter> => ({
  encrypt: jest.fn(),
})
