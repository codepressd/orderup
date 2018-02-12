import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

import { connectToDatabase } from '../../db';
import User from '../../models/User';
import { generateToken } from '../../utils/token';

// config environment variables for database
require('dotenv').config({ path: '../../variables.env' });

const jwtExpiration = '4h';

function setUserInfo(request) {

    return {
        userId: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        parent: request.parent,
        email: request.email,
        isChild: request.isChild,
        childRole: request.childRole,
        profileImage: request.profile.profileImage,
        companyName: request.profile.companyName,
        companyLogo: request.profile.companyLogo,
        userView: request.userView,
        phone: request.profile.phone,
        role: request.role,
        address: request.profile.address,
        city: request.profile.city,
        state: request.profile.state,
        region: request.profile.region
    }
};

export const postSignup: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const requestBody = JSON.parse(event.body);
    connectToDatabase()
        .then(() => {
            const user = new User({
                email: requestBody.email,
                password: requestBody.password,
                parent: requestBody.parentId,
                isChild: requestBody.isChild,
                profile: {
                    firstName: "",
                    lastName: "",
                    profileImage: "",
                    title: "",
                    companyName: requestBody.businessName,
                    companyLogo: "",
                    address: "",
                    phone: "",
                    city: "",
                    state: "",
                    region: requestBody.region,
                    businessType: ""
                },
                role: requestBody.role,
                childRole: requestBody.childRole,
                userView: requestBody.userView
            });

            User.findOne({ email: requestBody.email }, (err, existingUser) => {

                if (existingUser) {
                    const res = {
                        statusCode: 402,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({
                            error: "Account with that email address already exists."
                        }),
                    };
                    cb(null, res);
                }
                user.save((err) => {
                    if (err) {
                        const res = {
                            statusCode: 402,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                            },
                            body: JSON.stringify({
                                error: "There was an issue creating your account please try again"
                            }),
                        };
                        cb(null, res);
                    }
                    const userInfo = setUserInfo(user);
                    const res = {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({
                            success: true,
                            token: 'JWT ' + generateToken(userInfo),
                            user: userInfo
                        }),

                    };
                    cb(null, res);
                });
            });

        })
        .catch((e) => {
            const res = { // Error response
                statusCode: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    error: e.message,
                }),
            };
            cb(null, res);
        });
}
