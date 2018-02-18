import Axios from 'axios';

import * as Router from './RouterActions';


export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const USER_NOT_AUTHORIZED = 'USER_NOT_AUTHORIZED';

export const signupRequest = (data: any) => (dispatch: any) => {

    return Axios.post('/api/user/signup', data)
        .then(res => {
            const { activeUser, token, success } = res.data;

            dispatch(authorizeUser(activeUser, token, success));

            dispatch(Router.push("dashboard"));
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



export const loginRequest = (data: any) => (dispatch: any) => {

    return Axios.post('/api/user/login', data)
        .then(res => {
            const { user, token, success } = JSON.parse(res.data.body);

            dispatch(authorizeUser(user, token, success));
            dispatch(Router.push("dashboard"));
        })
        .catch(res => {

        });

}