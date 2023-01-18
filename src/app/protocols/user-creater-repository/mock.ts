import { faker } from '@faker-js/faker'
import { UserCreaterRepository, UserCreaterRepositoryParams } from '.'

export const mockUserCreaterRepository =
  (): jest.Mocked<UserCreaterRepository> => ({
    create: jest.fn(),
  })

export const mockUserCreaterRepositoryParams =
  (): UserCreaterRepositoryParams => ({
    email: faker.internet.email(),
    name: faker.name.fullName(),
    passwordHashed: faker.datatype.uuid(),
  })
