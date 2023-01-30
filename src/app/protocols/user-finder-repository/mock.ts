import { faker } from '@faker-js/faker'
import {
  UserFinderRepository,
  UserFinderRepositoryModel,
  UserFinderRepositoryParams,
} from '.'

export const mockUserFinderRepositoryParams =
  (): UserFinderRepositoryParams => ({
    by: 'id',
    value: faker.random.word(),
  })

export const mockUserFinderRepositoryModel = (): UserFinderRepositoryModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  passwordHashed: faker.datatype.uuid(),
})

export const mockUserFinderRepository =
  (): jest.Mocked<UserFinderRepository> => ({
    find: jest.fn(),
  })
