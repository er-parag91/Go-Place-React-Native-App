import {
    SET_PLACES
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
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong on our end. Please try again');
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsed => {
                console.log(parsed);
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong on our end. Please try again');
                dispatch(uiStopLoading());
            });
    }
}

export const getPlaces = () => {
    return dispatch => {
        return fetch('https://go-places-79741.firebaseio.com//placeData.json')
            .then(res => res.json())
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
            })
            .catch(err => {
                alert('Something went wrong on our end. Please Try again');
                console.log(err);
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
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}