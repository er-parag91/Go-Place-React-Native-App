import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../action/actionTypes';

const initialState = {
    token: null,
    expiryDate: null,
    localId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expiryDate: action.expiryDate,
                localId: action.localId
            }

        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
                expiryDate: null,
                localId: null
            }
                    
        default: 
            return state;
    }
}

export default authReducer