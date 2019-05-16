import {
    PATIENT_UPDATE_BEGIN,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAILURE,
    PATIENT_UPDATE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PATIENT_UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PATIENT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };
        case PATIENT_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };
        case PATIENT_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                update: {} 
            };
        default: return state;
    }
};