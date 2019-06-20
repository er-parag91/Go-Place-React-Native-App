import {
    ADD_PLACE,
    DELETE_PLACE
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
                    placeName: action.placeName,
                    placeDescription: action.placeDescription,
                    location: action.location,
                    key: Math.random(),
                    placeImage: {
                        uri: action.placeImage.uri
                    }
                })
            }

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                        return place.key !== action.placeKey
                    }),
                    selectedPlace: null
            }

        default: 
            return state
    }
}

export default reducer;