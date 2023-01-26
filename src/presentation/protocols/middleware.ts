import { HttpErrorResponse } from './http'

export interface Middleware<Params = any> {
  handle(params: Params): Promise<void | HttpErrorResponse>
}
