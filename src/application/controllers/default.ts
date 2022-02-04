import { HttpResponse, notFound, serverError } from "../helpers";
import { WebsocketAPIGatewayEvent } from "../types";
import broadcast from "../helpers/broadcast";
import { Controller } from "../protocols/controller";
import { WebsocketsClient } from "../../infra/gateways";

export class DefaultController implements Controller {
  constructor(private readonly ws: WebsocketsClient){}

  async handle(request: WebsocketAPIGatewayEvent ): Promise<HttpResponse> {
    try {
      await broadcast(`not found ${request.requestContext.connectionId}`, this.ws)

      return notFound()
    } catch (error) {
      console.log("defaultHandler.error", error);
      return serverError(error);
    }
  }
}