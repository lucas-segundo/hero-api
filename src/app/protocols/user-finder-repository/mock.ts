import { faker } from '@faker-js/faker'
import { UserFinderRepository, UserFinderRepositoryParams } from '.'

export const mockUserFinderRepository =
  (): jest.Mocked<UserFinderRepository> => ({
    find: jest.fn(),
  })

export const mockUserFinderRepositoryParams =
  (): UserFinderRepositoryParams => ({
    by: 'id',
    value: faker.random.word(),
  })
