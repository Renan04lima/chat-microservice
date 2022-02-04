import { WebsocketAPIGatewayEvent } from "../types";
import {
  deleteConnection,
  getAllConnections
} from "../../infra/repository/dynamodb";
import broadcast from "../helpers/broadcast";
import { ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols/controller";
import { WebsocketsClient } from "../../infra/gateways";

export class DisconnectController implements Controller{
  constructor(private readonly ws: WebsocketsClient){}
  
  async handle({requestContext}: WebsocketAPIGatewayEvent): Promise<HttpResponse>  {
    try {
      const { connectionId, connectedAt } = requestContext;

      await deleteConnection(connectionId, connectedAt);
      const connections = await getAllConnections();
      await broadcast(connections, this.ws);

      return ok();
    } catch (error) {
      return serverError(error)
    }
  };
}