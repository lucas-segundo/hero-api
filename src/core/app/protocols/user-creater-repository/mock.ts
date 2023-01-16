import { UserCreaterRepository } from '.'

export const mockUserCreaterRepository =
  (): jest.Mocked<UserCreaterRepository> => ({
    create: jest.fn(),
  })
