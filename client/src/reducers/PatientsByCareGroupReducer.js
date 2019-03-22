
import {
    PATIENTS_BY_CAREGROUP_BEGIN,
    PATIENTS_BY_CAREGROUP_SUCCESS,
    PATIENTS_BY_CAREGROUP_FAILURE
} from '../actions/types';

const initialState = {
    listPatients: [],
    loading: false,
    error: null
};

export default function patientsByCareGroupReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case PATIENTS_BY_CAREGROUP_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PATIENTS_BY_CAREGROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                listPatients: action.payload.listPatients
            };

        case PATIENTS_BY_CAREGROUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                plistPatients: []
            };

        default: return state;
    }
}