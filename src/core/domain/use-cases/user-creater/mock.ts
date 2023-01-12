import { UserCreater } from '.'

export const mockUserCreater = (): jest.Mocked<UserCreater> => ({
  create: jest.fn(),
})
