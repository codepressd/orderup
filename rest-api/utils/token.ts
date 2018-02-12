import _ from 'lodash';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UserModel } from '../models/User';

// config environment variables for database
dotenv.config({ path: '../../variables.env' });

export const generateToken = (user: UserModel) => {
    return jwt.sign(user, process.env.secret, { expiresIn: '4hr' });
}

export const authorizeUser = (userScopes, methodArn) => {
    const hasValidScope = _.some(userScopes, scope => _.endsWith(methodArn, scope));
    return hasValidScope;
};

export const buildIAMPolicy = (userId: string, effect: any, resource: any, context: { user: string }) => {
    const policy = {
        principalId: userId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context,
    };

    return policy;
};
