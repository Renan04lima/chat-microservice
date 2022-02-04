import { WebsocketAPIGatewayEvent } from "../types";
import { saveConnection } from "../../infra/repository/dynamodb";
import { ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols/controller";

export class ConnectController implements Controller{
  async handle({requestContext}: WebsocketAPIGatewayEvent): Promise<HttpResponse> {
    try {
      const { connectionId, connectedAt } = requestContext;
      await saveConnection(connectionId, connectedAt);
    
      return ok();
    } catch (error) {
      return serverError(error)
    }
  }
}
