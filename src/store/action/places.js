import { ADD_PLACE, DELETE_PLACE } from './actionTypes';


export const addPlace = (placeName, placeDescription, location, placeImage) => {
    return {
        type: ADD_PLACE,
        placeName: placeName,
        placeDescription: placeDescription,
        location: location,
        placeImage: placeImage
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
