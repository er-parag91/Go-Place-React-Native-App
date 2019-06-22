import {
    SET_PLACES,
    REMOVE_PLACE,
    PLACE_ADDED,
    START_ADD_PLACE
} from './actionTypes';
import {
    uiStartLoading,
    uiStopLoading,
    authGetToken
} from './index';


export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    }
}

export const addPlace = (placeName, placeDescription, location, placeImage, localId) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                alert('Invalid token supplied');
            })
            .then((token) => {
                authToken = token;
                return fetch('https://us-central1-go-places-79741.cloudfunctions.net/storeImage', {
                    method: "POST",
                    body: JSON.stringify({
                        image: placeImage.base64
                    }),
                    headers: {
                        "authorization": "Bearer " + authToken
                    }
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('could not submit the image');
                }
            })
            .then(parsed => {
                if (parsed.error) {
                    throw new Error(parsed.error)
                } else {

                    const placeData = {
                        placeName,
                        placeDescription,
                        location,
                        localId,
                        placeImage: parsed.imageUrl
                    }
                    return fetch(`https://go-places-79741.firebaseio.com//placeData.json?auth=${authToken}`, {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    })
                }
            })
            .catch(err => {
                alert('Server/Auth ' + err);
                dispatch(uiStopLoading())
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Error occured while submitting. Please try again');
                }
            })
            .then(parsed => {
                if (parsed.error) {
                    throw new Error(parsed.error)
                } else {
                    dispatch(uiStopLoading());
                    dispatch(placeAdded());
                }
            })
            .catch(err => {

                alert('Server/Auth ' + err);
                dispatch(uiStopLoading());
            });
    }
}

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

export const getPlaces = () => {
    return (dispatch, getState) => {
        localId = getState().auth.localId;
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                alert('Invalid Token supplied');
            })
            .then(token => {
                return fetch('https://go-places-79741.firebaseio.com//placeData.json?auth=' + token + '&orderBy="localId"&equalTo="' + localId + '"')
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Error occured while loading data. Please try again');
                }
            })
            .then(parsed => {

                    const places = [];

                    for (let key in parsed) {
                        places.push({
                            ...parsed[key],
                            key: key,
                            placeImage: {
                                uri: parsed[key].placeImage
                            }
                        })
                    }
                    dispatch(setPlaces(places));
                    dispatch(uiStopLoading())
                
            })
            .catch(err => {
                alert('Server/Auth ' + err);
                dispatch(uiStopLoading())
            })
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                alert('Invalid token supplied');
            })
            .then((token) => {
                dispatch(removePlace(key))
                return fetch(`https://go-places-79741.firebaseio.com//placeData/${key}.json?auth=${token}`, {
                    method: 'DELETE'
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Error occured while deleting. Please try again');
                }
            })
            .then((parsed) => {
                    dispatch(uiStopLoading())
            })
            .catch(err => {
                alert('Server/Auth ' + err)
                dispatch(uiStopLoading())
            })

    }
}

const removePlace = (key) => {
    return {
        type: REMOVE_PLACE,
        key: key
    }
}