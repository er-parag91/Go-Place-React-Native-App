import AsyncStorage from '@react-native-community/async-storage';
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
                throw new Error(`${parsedRes.error.message} : Authentication error. Plaese try again`)
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
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

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem('gp:auth:token', token);
        AsyncStorage.setItem('gp:auth:expiryDate', expiryDate.toString());
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem('gp:auth:token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem('gp:auth:expiryDate')

                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject())
            } else {
                resolve(token);
            }
        })
        return promise;
    }
}

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            StartMainTabs();
        })
        .catch (err => alert('failed to fetch saved token'));
    }
}