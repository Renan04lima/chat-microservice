export type HttpResponse<T = any> = {
  statusCode: number,
  data?: T
} 

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
