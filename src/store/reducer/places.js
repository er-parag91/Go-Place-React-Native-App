import {
    ADD_PLACE,
    DELETE_PLACE
} from '../action/actionTypes';

const initialState = {
    places: [{
        placeName: 'San Francisco',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'http://www.transindiatravels.com/wp-content/uploads/visakhapatnam-1.jpg'
        }
    },
    {
        placeName: 'New Orleans',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'http://www.transindiatravels.com/wp-content/uploads/visakhapatnam-1.jpg'
        }
    },{
        placeName: 'Chicago',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'http://www.transindiatravels.com/wp-content/uploads/visakhapatnam-1.jpg'
        }
    },{
        placeName: 'Miami',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'http://www.transindiatravels.com/wp-content/uploads/visakhapatnam-1.jpg'
        }
    }],
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
                    key: Math.random(),
                    placeImage: {
                        uri: 'http://www.transindiatravels.com/wp-content/uploads/visakhapatnam-1.jpg'
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