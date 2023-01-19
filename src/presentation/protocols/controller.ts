import { HttpErrorResponse, HttpResponse } from './http'

export interface Controller<Params = any> {
  handle(params: Params): Promise<HttpResponse | HttpErrorResponse>
}
