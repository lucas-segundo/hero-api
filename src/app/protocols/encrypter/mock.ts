import { faker } from '@faker-js/faker'
import { Encrypter, EncrypterParams } from '.'

export const mockEncrypterParams = (): EncrypterParams => ({
  payload: faker.datatype.uuid(),
})

export const mockEncrypter = (): jest.Mocked<Encrypter> => ({
  encrypt: jest.fn(),
})
