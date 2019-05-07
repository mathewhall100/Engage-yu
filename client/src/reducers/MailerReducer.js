import {
    MAILER_BEGIN,
    MAILER_SUCCESS,
    MAILER_FAILURE,
    MAILER_RESET
} from '../actions/types';

const initialState = {
    mail: {},
    loading: false,
    error: null
};

export default function patientReducer( 
    state = initialState,
    action
    ) {
    switch(action.type) {
        case MAILER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case MAILER_SUCCESS:
            return {
                ...state,
                loading: false,
                mail: action.payload.mail
            };
        case MAILER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                mail: {}
            };
        case MAILER_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                mail: {}
            };
        default: return state;
    }
}