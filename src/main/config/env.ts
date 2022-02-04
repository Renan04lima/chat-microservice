import {get} from 'env-var'

export const env = {
    dynamoDB: {
        connectionsTable: get('CONNECTIONS_TABLE').required().asString(),
        sessionTTL: get('SESSION_TTL').required().asString(),
        messagesTable: get('MESSAGES_TABLE').required().asString(),
    } 
}
