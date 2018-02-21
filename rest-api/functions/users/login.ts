import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { connectToDatabase } from '../../db';
import User from '../../models/User';
import { generateToken, setUserInfo } from '../../utils/token';
import { formatErrorResponse, formatLoginSuccessResponse } from '../../utils/format';

// conncet to db
connectToDatabase();

export const postLogin: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    processLogin(event, context, cb);
};

function processLogin(event: APIGatewayEvent, context: Context, cb: Callback) {
    const loginDetails: any = event.body;
    try {
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
                    const response = formatLoginSuccessResponse(200, "This worked", userInfo);
                    cb(null, response);
                })
                .catch((err) => {
                    const res = formatErrorResponse(422, err.message);
                    cb(null, res);
                });
        });
    } catch (err) {
        const res = formatErrorResponse(401, err.message);
        cb(null, res);
    };
}