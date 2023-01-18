import { HttpResponse } from './http'

export interface Controller<RequestData = any> {
  handle(requestData: RequestData): Promise<HttpResponse>
}
