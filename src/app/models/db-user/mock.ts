import { DbUser } from '.'
import { faker } from '@faker-js/faker'

export const mockDbUser = (): DbUser => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  passwordHashed: faker.datatype.uuid(),
})
