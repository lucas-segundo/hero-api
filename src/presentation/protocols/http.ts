export type HttpResponse<Data = any> = {
  data: Data
  statusCode: number
}

export type HttpErrorResponse = {
  errors: any[]
  statusCode: number
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}
