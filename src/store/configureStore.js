import { createStore, combineReducers } from 'redux';

import placeReducer from './reducer/places';
import { authReducer } from './reducer/auth';

const rootReducer = combineReducers({
    places: placeReducer,
    auth: authReducer
})

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;