import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';


export const addPlace = place => {
    return {
        type: ADD_PLACE,
        place: place
    }
}

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}
