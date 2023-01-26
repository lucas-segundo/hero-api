import { faker } from '@faker-js/faker'
import { TokenPayload } from '.'

export const mockTokenPayload = (): TokenPayload => ({
  id: faker.datatype.uuid(),
})
