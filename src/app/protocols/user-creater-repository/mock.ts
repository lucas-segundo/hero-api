import { faker } from '@faker-js/faker'
import {
  UserCreationRepository,
  UserCreationRepositoryModel,
  UserCreationRepositoryParams,
} from '.'

export const mockUserCreationRepositoryParams =
  (): UserCreationRepositoryParams => ({
    email: faker.internet.email(),
    name: faker.name.fullName(),
    passwordHashed: faker.datatype.uuid(),
  })

export const mockUserCreationRepositoryModel =
  (): UserCreationRepositoryModel => ({
    id: faker.datatype.uuid(),
  })

export const mockUserCreationRepository =
  (): jest.Mocked<UserCreationRepository> => ({
    create: jest.fn(),
  })
