import {
    ADD_PLACE,
    DELETE_PLACE,
    DESELECT_PLACE,
    SELECT_PLACE
} from '../action/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    place: action.place,
                    key: Math.random(),
                    placeImage: {
                        uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
                    }
                })
            }

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                        return place.key !== state.selectedPlace.key
                    }),
                    selectedPlace: null
            }

        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find((place, i) => {
                    return i === action.index;
                })
            }

        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            }

        default: 
            return state
    }
}

export default reducer;