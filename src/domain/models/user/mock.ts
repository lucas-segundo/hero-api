import { User } from '.'
import { faker } from '@faker-js/faker'

export const mockUser = (): User => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  passwordHashed: faker.internet.password(),
})
