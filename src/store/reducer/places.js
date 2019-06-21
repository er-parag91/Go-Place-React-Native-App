import {
    REMOVE_PLACE,
    SET_PLACES
} from '../action/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
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
                    selectedPlace: null
            }

        default: 
            return state
    }
}

export default reducer;