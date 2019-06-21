import { PUT_AUTH } from './actionTypes';
import { api } from '../../path';
import StartMainTabs from '../../screens/MainTabs/MainTabs';
import { uiStartLoading, uiStopLoading } from './ui';

export const auth = (authData) => {
    return dispatch => {
        dispatch(authSignup(authData));
    }
}

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${api}`, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            header: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => {
        dispatch(uiStopLoading())
        StartMainTabs();
        })
        .catch(err => {
            dispatch(uiStopLoading())
            alert('You are not the one we are looking for')
            console.warn(err, 'errors');
        })
    }
}