import { ServerError } from "../errors"

export type HttpResponse<T = any> = {
  statusCode: number,
  body?: T
} 

export const ok = <T = any> (body?: T): HttpResponse<T> => ({
    statusCode: 200,
    body
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: 'not found'
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})

