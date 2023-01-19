import { Response } from 'express'
import { HttpErrorResponse, HttpResponse } from 'presentation/protocols/http'

export const handleResponse = (
  res: Response,
  result: HttpResponse | HttpErrorResponse
) => {
  if ('errors' in result) {
    res.status(result.statusCode).send({ errors: result.errors })
  } else {
    res.status(result.statusCode).send({ data: result.data })
  }
}
