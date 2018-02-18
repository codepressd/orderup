import { generateToken } from "./token";

export const formatErrorResponse = (statusCode: number, message: string) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            error: message
        }),
    }
}

export function formatLoginSuccessResponse<T>(statusCode: number, message: string, userInfo: any, responseData: T) {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            success: true,
            token: 'JWT ' + generateToken(userInfo),
            responseData,
        })
    }
}