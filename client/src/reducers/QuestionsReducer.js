import {
    QUESTIONS_BEGIN,
    QUESTIONS_SUCCESS,
    QUESTIONS_FAILURE
} from '../actions/types';

const initialState = {
    questions: {},
    loading: false,
    error: null
};

export default function questionsReducer( 
    
    state = initialState,
    action
) {
    switch(action.type) {
        case QUESTIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload.questions
            };

        case QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                questions: {}
            };

        default: return state;
    }
}