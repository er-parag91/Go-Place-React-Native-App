import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { api } from '../../path';
import StartMainTabs from '../../screens/MainTabs/MainTabs';
import { uiStartLoading, uiStopLoading } from './ui';
import Main from '../../../App';

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
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken, parsedRes.localId));
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

export const authStoreToken = (token, expiresIn, refreshToken, localId) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate, localId));
        AsyncStorage.setItem('gp:auth:token', token);
        AsyncStorage.setItem('gp:auth:expiryDate', expiryDate.toString());
        AsyncStorage.setItem('gp:auth:refreshToken', refreshToken);
        AsyncStorage.setItem('gp:auth:localId', localId);
    }
}

export const authSetToken = (token, expiryDate, localId) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
        localId: localId
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().state.expiryDate;
            if (!token || new Date(expiryDate) <= now.Date()) {
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
        return promise
        .catch(err => {
            return AsyncStorage.getItem('gp:auth:refreshToken')
                .then(refreshToken => {
                    return fetch(`https://securetoken.googleapis.com/v1/token?key=${api}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token, parsedRes.user_id));
                        return parsedRes.id_token;
                    } else {
                        dispatch(authClearStorage())
                    }
                })
        })
        .then(token => {
            if (!token) {
                throw new Error()
            } else {
                return token;
            }
        });
    }
}

export const autoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            StartMainTabs();
        })
        .catch (err => {});
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('gp:auth:token')
        AsyncStorage.removeItem('gp:auth:expiryDate')
        AsyncStorage.removeItem('gp:auth:localId')
        return AsyncStorage.removeItem('gp:auth:refreshToken')
    }
}

export const authLogOut = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                Main();
            })
        dispatch(authRemoveToken())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}