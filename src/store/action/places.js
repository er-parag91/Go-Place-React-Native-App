import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';


export const addPlace = place => {
    return {
        type: ADD_PLACE,
        place: place
    }
}

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    }
}

export const selectPlace = (index) => {
    return {
        type: SELECT_PLACE,
        index: index
    }
}

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    }
}