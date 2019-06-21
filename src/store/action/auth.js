import { AUTH_SET_TOKEN } from './actionTypes';
import { api } from '../../path';
import StartMainTabs from '../../screens/MainTabs/MainTabs';
import { uiStartLoading, uiStopLoading } from './ui';

export const auth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        let endPoint = 'verifyPassword';
        if (authMode === 'signup') {
            endPoint = 'signupNewUser';
        }
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${endPoint}?key=${api}`, {
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
        .then(parsedRes => {
            if (parsedRes.error) {
                console.warn()
                throw new Error(`${parsedRes.error.message} : Authentication error. Plaese try again`)
            } else {
                dispatch(authSetToken(parsedRes.idToken));
                dispatch(uiStopLoading())
                StartMainTabs();
            }
        })
        .catch(err => {
            dispatch(uiStopLoading())
            alert(err)
        })
    }
}

const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}