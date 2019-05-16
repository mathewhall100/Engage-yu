import {
    USER_PROFILE,
    USER_FAILURE,
} from '../actions/types';

const initialState = {
    user: {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_PROFILE : 
            return {
                ...state,
                user: action.payload.user,
                error: null
            }
        case USER_FAILURE : 
            return {
                ...state,
                error: action.payload.error,
                user : {},
            }
        default: return state;
    }
};
