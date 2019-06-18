import { PUT_AUTH } from './actionTypes';

export const auth = (authData) => {
    return {
        type: PUT_AUTH,
        email: authData.email,
        password: authData.password,
    }
}