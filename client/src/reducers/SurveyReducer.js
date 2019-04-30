import {
    SURVEY_BEGIN,
    SURVEY_SUCCESS,
    SURVEY_FAILURE,
    SURVEY_RESET
} from '../actions/types';

const initialState = {
    survey: {},
    loading: false,
    error: null
};

export default function surveyReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case SURVEY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case SURVEY_SUCCESS:
            return {
                ...state,
                loading: false,
                survey: action.payload.survey
            };

        case SURVEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                survey: []
            };

        case SURVEY_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                survey: []
            };

        default: return state;
    }
}