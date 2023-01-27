import * as request from 'supertest'

export const getAuthToken = async () => {
  const response = await request('http://localhost:3000').post('/auth').send({
    email: 'lucas@gmail.com',
    password: 'testas22',
  })

  return response.body.data.token
}
