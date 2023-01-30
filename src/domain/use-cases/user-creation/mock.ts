import { faker } from '@faker-js/faker'
import { UserCreation, UserCreationParams } from '.'

export const mockUserCreation = (): jest.Mocked<UserCreation> => ({
  create: jest.fn(),
})

export const mockUserCreationParams = (): UserCreationParams => ({
  email: faker.internet.email(),
  name: faker.name.fullName(),
  password: faker.internet.password(),
})
