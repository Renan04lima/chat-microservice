import { Handler } from "aws-lambda";
import { WebsocketAPIGatewayEvent } from "../application/types";
import { ConnectController, DefaultController, DisconnectController, MessageController } from "../application/controllers";
import { ApiWebsocketsClient } from "../infra/gateways";

export const index: Handler = async (event: WebsocketAPIGatewayEvent, _, cb) => {
    const route = event.requestContext.routeKey;
    const url = `https://${event.requestContext.domainName}/${event.requestContext.stage}`
    const ws = new ApiWebsocketsClient(url)

    switch (route) {
        case "$connect":
            const connectController = new ConnectController()
            return connectController.handle(event);
        case "$disconnect":
            const disconnectController = new DisconnectController(ws);
            return disconnectController.handle(event);
        case "message":
            const messageController = new MessageController(ws)
            return messageController.handle(event)
        default:
            const defaultController = new DefaultController(ws)
            return defaultController.handle(event)
    }
}