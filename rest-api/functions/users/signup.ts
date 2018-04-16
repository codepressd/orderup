import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { connectToDatabase, connectToPostgres } from '../../db';
import User from '../../models/User';
import { generateToken, setUserInfo } from '../../utils/token';
import { formatErrorResponse, formatLoginSuccessResponse } from '../../utils/format';
import { sqlQueries } from '../../sql/resources/sqlQueries';

export const postSignup: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // To get this to work you have to make this any. You can't stringify the post or it gets undefined????
    // I need to figure out why this is happenening
    const requestBody: any = event.body;
    const Pool = await connectToPostgres();
    const sqlForLife = await sqlQueries.createTable();
    Pool.query(sqlForLife, (err, res) => {
        console.log(err, res);
        Pool.release();
    });
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
                    const res = formatErrorResponse(402, "Account with that email address already exists.");
                    cb(null, res);
                }
                user.save((err) => {
                    if (err) {
                        const res = formatErrorResponse(402, "There was an issue creating your account please try again");
                        cb(null, res);
                    }
                    const userInfo = setUserInfo(user);
                    const res = formatLoginSuccessResponse(200, "This Worked", userInfo);
                    cb(null, res);
                });
            });

        })
        .catch((err) => {
            const res = formatErrorResponse(401, err.message);
            cb(null, res);
        });
};
