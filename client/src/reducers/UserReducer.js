import {
    USER_PROFILE,
    USER_FAILURE,
} from '../actions/types';

const userReducer = (
    state = {
        user: {},
        error: null
    }, 
    action
) => {
    console.log("action.type")
    switch (action.type) {
        case USER_PROFILE : 
        console.log("action.type: user", action.payload.user)
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

export default userReducer;