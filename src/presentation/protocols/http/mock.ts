import { faker } from '@faker-js/faker'
import { HttpErrorResponse } from '.'

export const mockHttpErrorResponse = (): HttpErrorResponse => ({
  errors: [faker.random.words()],
  statusCode: faker.internet.httpStatusCode({
    types: ['serverError', 'serverError'],
  }),
})
