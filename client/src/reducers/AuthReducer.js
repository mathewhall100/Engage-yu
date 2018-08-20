import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL, 
    LOGIN_USER,
    LOGIN_AUTHENTICATED,
    LOGOUT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    id_token : '',
    error : '',
    authenticated : false,
    profile : '',
    loading : false,
    message : '',
}

export default (state= INITIAL_STATE
    , action) => {
    console.log(action);

    switch (action.type) {
        case LOGIN_AUTHENTICATED : 
            return { ...state, authenticated : action.payload };
        case LOGIN_USER :
            return { ...state, loading : true, error : ''}
        case LOGIN_USER_SUCCESS :
            return { ...state, id_token : action.payload, error : '',};
        case LOGIN_USER_FAIL :
            return {...state, error : action.payload , loading : false};
        case LOGOUT_SUCCESS : 
            return {...state, authenticated: false, message : action.payload }
        default : 
            return state;
    }
};