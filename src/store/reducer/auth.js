import { PUT_AUTH } from '../action/actionTypes';

const initialState = {
    email: '',
    password: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type){
        case PUT_AUTH:
            return {
                ...state,
                email: action.email,
                password: action.password,
            }
                    
        default: 
            return state;
    }
}