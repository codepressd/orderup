import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { connectToDatabase } from '../../db';
import User from '../../models/User';
import { generateToken, setUserInfo } from '../../utils/token';
import { formatErrorResponse, formatLoginSuccessResponse } from '../../utils/format';

export const postLogin: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const loginDetails: any = event.body;

    connectToDatabase()
        .then(() => {
            User.findOne({ email: loginDetails.email }, (err, user) => {
                if (err) {
                    const res = formatErrorResponse(400, err.message);
                    cb(null, res);
                }
                if (!user) {
                    const res = formatErrorResponse(422, "Can\'t find as user by that email.");
                    cb(null, res);
                }
                user.comparePassword(loginDetails.password)
                    .then((res) => {
                        // Need to set up interface for User info
                        const userInfo = setUserInfo(user);
                        const response = formatLoginSuccessResponse(200, "This worked", userInfo, userInfo);
                        cb(null, response);
                    })
                    .catch((err) => {
                        const res = formatErrorResponse(422, err.message);
                        cb(null, res);
                    });
            });
        })
        .catch((err) => {
            const res = formatErrorResponse(401, err.message);
            cb(null, res);
        });
};