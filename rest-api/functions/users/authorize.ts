import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

import { authorizeUser, buildIAMPolicy } from '../../utils/token';


export const authorize = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const token = event.headers.authorizationToken;

    try {
        // Verify JWT
        const decoded = jwt.verify(token.replace(/^JWT\s/, ''), process.env.JWT_SECRET);
        const user = decoded.user;

        // Checks if the user's scopes allow her to call the current function
        const isAllowed = authorizeUser(user.scopes, event.headers.methodArn);

        const effect = isAllowed ? 'Allow' : 'Deny';
        const userId = user.id;
        const authorizerContext = { user: JSON.stringify(user) };
        // Return an IAM policy document for the current endpoint
        const policyDocument = buildIAMPolicy(userId, effect, event.headers.methodArn, authorizerContext);

        cb(null, policyDocument);
    } catch (e) {
        cb(null, 'Unauthorized'); // Return a 401 Unauthorized response
    }
};