import {
    REMOVE_PLACE,
    SET_PLACES,
    PLACE_ADDED,
    START_ADD_PLACE,
    PLACE_DELETED,
    START_DELETE_PLACE
} from '../action/actionTypes';

const initialState = {
    places: [],
    placeAdded: false,
    placeDeleted: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PLACES:
            return {
                ...state,
                places: action.places
            }

        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                        return place.key !== action.key
                    }),
                }
        
        case START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false
            }

        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true
            }

        case START_DELETE_PLACE:
                return {
                    ...state,
                    placeDeleted: false
                }
        
        case PLACE_DELETED:
            return {
                ...state,
                placeDeleted: true
            }
        default: 
            return state
    }
}

export default reducer;