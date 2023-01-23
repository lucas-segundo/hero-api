import { faker } from '@faker-js/faker'
import { HashComparer, HashComparerParams } from '.'

export const mockHashComparerParams = (
  value = faker.random.word()
): HashComparerParams => ({
  hashedValue: value,
  value: value,
})

export const mockHashComparer = (): jest.Mocked<HashComparer> => ({
  compare: jest.fn(),
})
