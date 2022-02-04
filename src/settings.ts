import * as env from 'env-var'

export const settings = {
    userPoolId: env.get('ANY').required().asString()
}
