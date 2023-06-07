export interface HttpResponse<B> {
  statusCode: number
  body: B | string
}