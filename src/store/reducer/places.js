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
            uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
        }
    },
    {
        placeName: 'New Orleans',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
        }
    },{
        placeName: 'Chicago',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
        }
    },{
        placeName: 'Miami',
        placeDescription: 'whatever',
        key: Math.random(),
        placeImage: {
            uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
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
                        uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
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