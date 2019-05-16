
import {
    PATIENTS_BY_PROVIDER_BEGIN,
    PATIENTS_BY_PROVIDER_SUCCESS,
    PATIENTS_BY_PROVIDER_FAILURE
} from '../actions/types';

const initialState = {
    listPatients: [],
    loading: false,
    error: null
};

export default ( state = initialState, action) => {
    switch(action.type) {
        case PATIENTS_BY_PROVIDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PATIENTS_BY_PROVIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                listPatients: action.payload.listPatients
            };
        case PATIENTS_BY_PROVIDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                listPatients: []
            };
        default: return state;
    }
};