import { faker } from '@faker-js/faker'
import { mockUser } from 'domain/models/user/mock'
import {
  AuthenticatedUser,
  UserAuthentication,
  UserAuthenticationParams,
} from '.'

export const mockUserAuthentication = (): jest.Mocked<UserAuthentication> => ({
  auth: jest.fn(),
})

export const mockUserAuthenticationParams = (): UserAuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockUserAuthenticationResult = (): AuthenticatedUser => ({
  token: faker.datatype.uuid(),
  user: mockUser(),
})
