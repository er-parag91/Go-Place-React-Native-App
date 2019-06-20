import {
    ADD_PLACE,
    DELETE_PLACE
} from './actionTypes';
import axios from 'axios';

export const addPlace = (placeName, placeDescription, location, placeImage) => {
    return dispatch => {
        const placeData = {
            placeName,
            placeDescription,
            location
        }

        axios.post('https://go-places-29706.firebaseio.com/placeData.json', placeData)
            .then(response => console.warn(response))
            .catch(err => console.warn(err))
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}