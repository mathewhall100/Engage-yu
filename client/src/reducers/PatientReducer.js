import {
    PATIENT_BEGIN,
    PATIENT_SUCCESS,
    PATIENT_FAILURE,
    PATIENT_RESET
} from '../actions/types';

const initialState = {
    patient: {},
    loading: false,
    error: null
};

export default function patientReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case PATIENT_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PATIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                patient: action.payload.patient
            };

        case PATIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                patient: {}
            };

        case PATIENT_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                patient: {}
            };


        default: return state;
    }
}