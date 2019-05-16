import { 
    QUESTIONS_BEGIN,
    QUESTIONS_SUCCESS, 
    QUESTIONS_FAILURE
} from './types';
import question_defaultAPI from '../utils/question_default';
import question_customAPI from '../utils/question_custom';


export const loadQuestions = () => {
    console.log("QuestionsAction: ");
    let defaultQuestion, customQuestions;
    return dispatch => {
        dispatch(questionsBegin());
        return question_defaultAPI.findAll()
            .then(res => {
                defaultQuestion = res.data[0]
                question_customAPI.findAll()
                .then(res => {
                    customQuestions = res.data
                    //console.log("QuestionsAPI - defaultQuestion: ", defaultQuestion)
                    //console.log("QuestionsAPI - customQuestions: ", customQuestions)
                    dispatch(questionsSuccess({defaultQuestion, customQuestions}));
                })
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(questionsFailure(err))
            });
    };
}

export const questionsBegin = () => ({
    type: QUESTIONS_BEGIN
});

export const questionsSuccess = questions => ({
    type: QUESTIONS_SUCCESS,
    payload : { questions }
});

export const questionsFailure = error => ({
    type: QUESTIONS_FAILURE,
    payload : { error }
});
