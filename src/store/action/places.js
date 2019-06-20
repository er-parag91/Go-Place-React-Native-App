import {
    ADD_PLACE,
    DELETE_PLACE
} from './actionTypes';

export const addPlace = (placeName, placeDescription, location, placeImage) => {
    return dispatch => {
        fetch('https://us-central1-go-places-79741.cloudfunctions.net/storeImage', {
                method: "POST",
                body: JSON.stringify({
                    image: placeImage.base64
                })
            })
            .catch(err => console.warn(err))
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
            .catch(err => console.warn(err))
            .then(res => res.json())
            .then(parsed => {
                console.warn(parsed);
            });
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}