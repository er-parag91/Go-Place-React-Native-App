import { UI_START_LOADING, UI_STOP_LOADING } from '../action/actionTypes';

const inititialState = {
    isLoading: false
}

const loadingReducer = (state = inititialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}

export default loadingReducer;