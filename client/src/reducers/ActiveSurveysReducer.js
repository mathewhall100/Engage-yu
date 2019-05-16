import {
    ACTIVE_SURVEYS_BEGIN,
    ACTIVE_SURVEYS_SUCCESS,
    ACTIVE_SURVEYS_FAILURE
} from '../actions/types';

const initialState = {
    surveys: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {

    switch(action.type) {

        case ACTIVE_SURVEYS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ACTIVE_SURVEYS_SUCCESS:
            return {
                ...state,
                loading: false,
                surveys: action.payload.activeSurveys
            };
        case ACTIVE_SURVEYS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                surveys: []
            };
        default: return state;
    }
};
