import { faker } from '@faker-js/faker'
import { Class } from '.'

export const mockHeroClass = (): Class => ({
  id: faker.datatype.uuid(),
  title: faker.random.word(),
})
