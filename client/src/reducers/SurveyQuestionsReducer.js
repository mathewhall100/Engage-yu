
import { SURVEY_QUESTIONS } from '../actions/types';

const INITIAL_STATE = {
    surveyDefaultQuestion : [],
    surveyCustomQuestions : [],

}

export default (state = INITIAL_STATE, action) => {
    

    switch (action.type) {
        case SURVEY_QUESTIONS :
            return { 
                surveyDefaultQuestion: action.payload.surveyDefaultQuestion, 
                surveyCustomQuestions: action.payload.surveyCustomQuestions.questionList,
            };
        default:
            return state;
    }
};