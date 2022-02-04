import broadcast from "../helpers/broadcast";
import { WebsocketAPIGatewayEvent } from "../types";
import { putMessage } from "../../infra/repository/dynamodb";
import { ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols/controller";
import { WebsocketsClient } from "../../infra/gateways";

export class MessageController implements Controller {
constructor(private readonly ws: WebsocketsClient){}

async handle (request: WebsocketAPIGatewayEvent): Promise<HttpResponse>  {
    try {
      await broadcast(request.body, this.ws);
      await putMessage(request.body);

      return ok()
    } catch (error) {
      console.log(error);
      return serverError(error)
    }
  }
}
