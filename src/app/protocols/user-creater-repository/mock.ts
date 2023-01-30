import { faker } from '@faker-js/faker'
import {
  UserCreaterRepository,
  UserCreaterRepositoryModel,
  UserCreaterRepositoryParams,
} from '.'

export const mockUserCreaterRepositoryParams =
  (): UserCreaterRepositoryParams => ({
    email: faker.internet.email(),
    name: faker.name.fullName(),
    passwordHashed: faker.datatype.uuid(),
  })

export const mockUserCreaterRepositoryModel =
  (): UserCreaterRepositoryModel => ({
    id: faker.datatype.uuid(),
  })

export const mockUserCreaterRepository =
  (): jest.Mocked<UserCreaterRepository> => ({
    create: jest.fn(),
  })
