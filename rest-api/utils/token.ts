import _ from 'lodash';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
const jwt = require('jsonwebtoken');

import { UserModel } from '../models/User';

export const generateToken = (user: UserModel) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '4hr' });
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

export const setUserInfo = (dataInfo: any) => {

    return {
        userId: dataInfo._id,
        firstName: dataInfo.profile.firstName,
        lastName: dataInfo.profile.lastName,
        parent: dataInfo.parent,
        email: dataInfo.email,
        isChild: dataInfo.isChild,
        childRole: dataInfo.childRole,
        profileImage: dataInfo.profile.profileImage,
        companyName: dataInfo.profile.companyName,
        companyLogo: dataInfo.profile.companyLogo,
        userView: dataInfo.userView,
        phone: dataInfo.profile.phone,
        role: dataInfo.role,
        address: dataInfo.profile.address,
        city: dataInfo.profile.city,
        state: dataInfo.profile.state,
        region: dataInfo.profile.region
    }
};
