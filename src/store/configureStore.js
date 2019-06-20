import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import placeReducer from './reducer/places';
import authReducer from './reducer/auth';
import loadingReducer from './reducer/ui';
loadingReducer

const rootReducer = combineReducers({
    places: placeReducer,
    auth: authReducer,
    loading: loadingReducer
})

let composeEnhancer = compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
}

export default configureStore;