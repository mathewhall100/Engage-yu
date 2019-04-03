import {
    PATIENT_UPDATE_SAVE_BEGIN,
    PATIENT_UPDATE_SAVE_SUCCESS,
    PATIENT_UPDATE_SAVE_FAILURE,
    PATIENT_UPDATE_SAVE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default function patientUpdateSaveReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case PATIENT_UPDATE_SAVE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PATIENT_UPDATE_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };

        case PATIENT_UPDATE_SAVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };

        case PATIENT_UPDATE_SAVE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                update: {} 
            };

        default: return state;
    }
}