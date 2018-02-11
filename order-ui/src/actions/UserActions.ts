import Axios from 'axios';

import * as Router from './RouterActions';


export const AUTHORIZE_USER = 'AUTHORIZE_USER';

export const signupRequest = (data: any) => (dispatch: any) => {

    return Axios.post('/api/user/signup', data)
        .then(res => {
            const { activeUser, token, success } = res.data;

            dispatch(authorizeUser(activeUser, token, success));

            return Router.push("dashboard");
        })
        .catch(res => {

        });

}

export const authorizeUser = (user: any, token: string, success: boolean) => {
    return {
        type: AUTHORIZE_USER,
        user,
        token,
        success
    }
};