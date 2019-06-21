import {
    SET_PLACES,
    REMOVE_PLACE
} from './actionTypes';
import {
    uiStartLoading,
    uiStopLoading,
    authGetToken
} from './index';

export const addPlace = (placeName, placeDescription, location, placeImage) => {
    return dispatch => {
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                alert('Invalid token supplied');
            })
            .then((token) => {
                fetch('https://us-central1-go-places-79741.cloudfunctions.net/storeImage', {
                    method: "POST",
                    body: JSON.stringify({
                        image: placeImage.base64
                    })
                })
            })
            .then(res => res.json())
            .then(parsed => {
                if (parsed.error) {
                    throw new Error(parsed.error)
                } else {
                    const placeData = {
                        placeName,
                        placeDescription,
                        location,
                        placeImage: parsed.imageUrl
                    }
                    return fetch('https://go-places-79741.firebaseio.com//placeData.json', {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    })
                }
            })
            .catch(err => {
                console.warn(err, 'jfewfjere');
                alert('Server/Auth ' + err);
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsed => {
                if (parsed.error) {
                    throw new Error(parsed.error)
                } else {
                    dispatch(uiStopLoading());
                }
            })
            .catch(err => {
                console.warn(err, 'eeeee');

                alert('Server/Auth ' + err);
                dispatch(uiStopLoading());
            });
    }
}

export const getPlaces = () => {
    return (dispatch) => {
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(() => {
                alert('Invalid Token supplied');
            })
            .then(token => {
                return fetch('https://go-places-79741.firebaseio.com//placeData.json?auth=' + token)
            })
            .then(res => res.json())
            .then(parsed => {
                if (parsed.error) {
                    throw new Error(parsed.error);
                } else {
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
                }
            })
            .catch(err => {
                console.warn(err, 'error occur')
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
            .then(res => res.json())
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