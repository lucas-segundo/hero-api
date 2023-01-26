import { faker } from '@faker-js/faker'
import { UserAuthorization, UserAuthorizationParams } from '.'

export const mockUserAuthorization = (): jest.Mocked<UserAuthorization> => ({
  auth: jest.fn(),
})

export const mockUserAuthorizationParams = (): UserAuthorizationParams => ({
  token: faker.datatype.uuid(),
})
