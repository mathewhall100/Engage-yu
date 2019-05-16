import * as types from '../../actions/auth/types';
import * as AuthService from '../../services/AuthService';

const initialState = {  
    isAuthenticated: !AuthService.isTokenExpired(),
    isFetching: false,
    loggedOut: false,
    profile: {}, 
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                loggedOut: false,
                error: null
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                loggedOut: false,
                profile: action.payload.profile
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                loggedOut: false,
                profile: {},
                error: action.error
            };
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loggedOut: true,
                profile: {}
            };
        default: return state;
    }
};
