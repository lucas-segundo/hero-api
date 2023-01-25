import { faker } from '@faker-js/faker'
import { Encrypter, EncrypterParams } from '.'

export const mockEncrypterParams = (): EncrypterParams => ({
  payload: {
    [faker.database.column()]: faker.random.word(),
  },
})

export const mockEncrypter = (): jest.Mocked<Encrypter> => ({
  encrypt: jest.fn(),
})
