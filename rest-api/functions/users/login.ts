import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { connectToDatabase } from '../../db';

// config environment variables for database
dotenv.config({ path: '../../variables.env' });

const jwtExpiration = '4h';

export const postLogin: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {

        })
        .catch(() => {

        });
}