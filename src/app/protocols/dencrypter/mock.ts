import { Dencrypter } from '.'

export const mockDencrypter = (): jest.Mocked<Dencrypter> => ({
  dencrypt: jest.fn(),
})
