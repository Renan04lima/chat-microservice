export interface WebsocketsClient {
  send: (msg: any, connectionId: string) => Promise<any>
}