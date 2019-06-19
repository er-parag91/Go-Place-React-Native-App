import { ADD_PLACE, DELETE_PLACE } from './actionTypes';


export const addPlace = (placeName, placeDescription) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        placeDescription: placeDescription
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
