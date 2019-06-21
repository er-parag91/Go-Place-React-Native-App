import {
    SET_PLACES,
    REMOVE_PLACE
} from './actionTypes';
import {
    uiStartLoading,
    uiStopLoading
} from './ui';

export const addPlace = (placeName, placeDescription, location, placeImage) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch('https://us-central1-go-places-79741.cloudfunctions.net/storeImage', {
                method: "POST",
                body: JSON.stringify({
                    image: placeImage.base64
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
                alert(err);
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
                alert(err);
                dispatch(uiStopLoading());
            });
    }
}

export const getPlaces = () => {
    return dispatch => {
        dispatch(uiStartLoading())
        return fetch('https://go-places-79741.firebaseio.com//placeData.json')
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
                alert(err);
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
    console.warn(key);
    return dispatch => {
        dispatch(removePlace(key))
        dispatch(uiStartLoading())
        fetch(`https://go-places-79741.firebaseio.com//placeData/${key}.json`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then((parsed) => {
                if (parsed.error) {
                    throw new Error(parsed.error);
                } else {
                    dispatch(uiStopLoading())
                }
            })
            .catch(err => {
                alert(err)
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