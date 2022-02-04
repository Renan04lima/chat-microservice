import { DynamoDB } from "aws-sdk";
import { env } from "../../main/config";

const dynamo = new DynamoDB.DocumentClient();

export const saveConnection = (connectionId: string, connectedAt: number) =>
  dynamo
    .put({
      TableName: env.dynamoDB.connectionsTable,
      Item: {
        connectionId,
        joinedAt: connectedAt,
        terminateAt: (
          connectedAt / 1000 +
          parseInt(env.dynamoDB.sessionTTL)
        ).toFixed(0)
      }
    })
    .promise();

export const deleteConnection = (connectionId: string, connectedAt: number) =>
  dynamo
    .delete({
      TableName: env.dynamoDB.connectionsTable,
      Key: {
        connectionId,
        joinedAt: connectedAt
      }
    })
    .promise();

export const getAllConnections = () =>
  dynamo.scan({ TableName: process.env.CONNECTIONS_TABLE }).promise();

export const putMessage = (body: string) =>
  dynamo
    .put({
      TableName: env.dynamoDB.messagesTable,
      Item: {
        body,
        roomKey: "PARTITION_0",
        createdAt: +new Date()
      }
    })
    .promise();

export const getLastNMessagesByTime = (from: number, count: number) =>
  dynamo
    .query({
      TableName: env.dynamoDB.messagesTable,
      KeyConditionExpression: "roomKey = :hkey and createdAt < :rkey",
      ExpressionAttributeValues: {
        ":hkey": "PARTITION_0",
        ":rkey": from
      },
      Limit: count,
      ScanIndexForward: false // Change order to descending!
    })
    .promise();
