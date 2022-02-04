import { WebsocketsClient } from "../../infra/gateways";
import { getAllConnections } from "../../infra/repository/dynamodb";

export default async (msg: any, ws: WebsocketsClient) => {
  const connections = await getAllConnections();
  if(!connections.Items) {
    throw new Error('sem conexões no banco de dados')
  }
  return connections.Items.map(connection => ws.send(msg, connection.connectionId))
};
