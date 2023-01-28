import { faker } from '@faker-js/faker'
import { Hero } from '.'
import { mockHeroClass } from '../class/mock'
import { mockRace } from '../race/mock'

export const mockHero = (): Hero => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  class: mockHeroClass(),
  race: mockRace(),
})
