import {
    PATIENT_SAVE_BEGIN,
    PATIENT_SAVE_SUCCESS,
    PATIENT_SAVE_FAILURE,
    PATIENT_SAVE_RESET
} from '../actions/types';

const initialState = {
    info: {},
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PATIENT_SAVE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PATIENT_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                info: action.payload.data
            };
        case PATIENT_SAVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                info: {}
            };
        case PATIENT_SAVE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                info: {}
            };
        default: return state;
    }
};