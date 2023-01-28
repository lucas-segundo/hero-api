import { faker } from '@faker-js/faker'
import { Race } from '.'

export const mockRace = (): Race => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
})
