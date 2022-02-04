import { ApiGatewayManagementApi } from 'aws-sdk';
import { WebsocketsClient } from '.';

export class ApiWebsocketsClient implements WebsocketsClient {
  private ws: ApiGatewayManagementApi;

  constructor(endpoint: string) {
    this.ws = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint,
    });
  }

  async send(msg: any, connectionId: string): Promise<any> {
    // If passed msg is object, it's parsed to JSON
    let parsed = typeof msg === 'string' ? msg : JSON.stringify(msg);

    console.log(`Sending ${parsed} to ${connectionId}`);

    return this.ws
      .postToConnection({
        ConnectionId: connectionId,
        Data: parsed,
      })
      .promise()
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }
}
