import { faker } from '@faker-js/faker'
import { UserCreater, UserCreaterParams } from '.'

export const mockUserCreater = (): jest.Mocked<UserCreater> => ({
  create: jest.fn(),
})

export const mockUserCreaterParams = (): UserCreaterParams => ({
  email: faker.internet.email(),
  name: faker.name.fullName(),
  password: faker.internet.password(),
})
